-- Luminous Center: Supabase schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor) after creating your project.
-- Replace with your own project URL and set SUPABASE_SERVICE_ROLE_KEY in .env.

-- Homework submissions (student code + admin review)
CREATE TABLE IF NOT EXISTS homework_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_slug TEXT NOT NULL,
  homework_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  files JSONB NOT NULL DEFAULT '{}',
  mark INTEGER CHECK (mark >= 0 AND mark <= 100),
  feedback TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_homework_submissions_course ON homework_submissions(course_slug);
CREATE INDEX IF NOT EXISTS idx_homework_submissions_user ON homework_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_homework_submissions_created ON homework_submissions(created_at DESC);

-- Enrollments (synced from app; optional if you want to persist in DB)
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  user_name TEXT,
  user_email TEXT,
  course_slug TEXT NOT NULL,
  course_title TEXT NOT NULL,
  project_label TEXT NOT NULL,
  enrolled_at TIMESTAMPTZ NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('govt', 'payment')),
  tran_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_slug)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_slug);

-- Optional: user access control (e.g. admit to govt project)
CREATE TABLE IF NOT EXISTS user_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  user_email TEXT,
  user_name TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admitted_govt', 'admin')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_user_access_user ON user_access(user_id);

-- Enable RLS (Row Level Security) if you use Supabase Auth later.
-- For now, API uses service_role key which bypasses RLS.
-- ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
