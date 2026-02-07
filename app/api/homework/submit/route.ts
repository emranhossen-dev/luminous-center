import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseSlug, homeworkId, userId, userName, userEmail, files } = body;

    if (!courseSlug || !homeworkId || !userId || !userName || !userEmail || typeof files !== "object") {
      return NextResponse.json(
        { error: "Missing courseSlug, homeworkId, userId, userName, userEmail, or files" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("homework_submissions")
      .insert({
        course_slug: courseSlug,
        homework_id: homeworkId,
        user_id: userId,
        user_name: userName,
        user_email: userEmail,
        files,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Supabase homework submit error:", error);
      const msg = error.message || "Database error";
      const hint = msg.includes("relation") || msg.includes("does not exist")
        ? " Run the SQL in supabase/schema.sql in your Supabase project (SQL Editor)."
        : "";
      return NextResponse.json({ error: msg + hint }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id, created_at: data.created_at });
  } catch (e) {
    console.error("Homework submit error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
