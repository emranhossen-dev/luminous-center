import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function requireAdmin(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const secret = process.env.ADMIN_SECRET;
  return !!secret && token === secret;
}

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("user_access")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (e) {
    console.error("Admin user-access GET error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { user_id, user_email, user_name, role, notes } = body;
    if (!user_id || !role) {
      return NextResponse.json({ error: "user_id and role required" }, { status: 400 });
    }
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("user_access")
      .upsert(
        {
          user_id,
          user_email: user_email ?? null,
          user_name: user_name ?? null,
          role,
          notes: notes ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e) {
    console.error("Admin user-access POST error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
