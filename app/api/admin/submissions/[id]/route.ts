import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function requireAdmin(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const secret = process.env.ADMIN_SECRET;
  return !!secret && token === secret;
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  try {
    const body = await request.json();
    const { mark, feedback } = body;
    const supabase = getSupabaseAdmin();
    const updates: Record<string, unknown> = {
      reviewed_at: new Date().toISOString(),
    };
    if (typeof mark === "number" && mark >= 0 && mark <= 100) updates.mark = mark;
    if (typeof feedback === "string") updates.feedback = feedback;
    const { data, error } = await supabase
      .from("homework_submissions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e) {
    console.error("Admin submission update error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
