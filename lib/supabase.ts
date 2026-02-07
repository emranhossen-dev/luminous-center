import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function getSupabaseAdmin() {
  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, serviceRoleKey);
}

export type HomeworkSubmissionRow = {
  id: string;
  course_slug: string;
  homework_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  files: Record<string, string>;
  mark: number | null;
  feedback: string | null;
  reviewed_at: string | null;
  created_at: string;
};

export type EnrollmentRow = {
  id: string;
  user_id: string;
  user_name: string | null;
  user_email: string | null;
  course_slug: string;
  course_title: string;
  project_label: string;
  enrolled_at: string;
  method: "govt" | "payment";
  tran_id: string | null;
  created_at: string;
};
