import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, user_name, user_email, course_slug, course_title, project_label, method, tran_id, enrolled_at } = body;

    if (!user_id || !course_slug || !course_title || !project_label || !method) {
      return NextResponse.json(
        { error: "Missing required fields: user_id, course_slug, course_title, project_label, method" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("enrollments").upsert(
      {
        user_id,
        user_name: user_name ?? null,
        user_email: user_email ?? null,
        course_slug,
        course_title,
        project_label,
        enrolled_at: enrolled_at || new Date().toISOString(),
        method: method === "govt" ? "govt" : "payment",
        tran_id: tran_id ?? null,
      },
      { onConflict: "user_id,course_slug" }
    );

    if (error) {
      console.error("Enrollment sync error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Enrollment API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
