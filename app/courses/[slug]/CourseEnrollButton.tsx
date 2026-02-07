"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEnrollment } from "@/context/EnrollmentContext";
import type { CourseItem } from "@/app/data/courses";

export default function CourseEnrollButton({ course }: { course: CourseItem }) {
  const router = useRouter();
  const { user } = useAuth();
  const { isEnrolled } = useEnrollment();

  if (isEnrolled(course.slug)) {
    return (
      <Link
        href="/my-classes"
        className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition"
      >
        My Classes এ দেখুন
      </Link>
    );
  }

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push(`/login?returnUrl=${encodeURIComponent(`/courses/${course.slug}/enroll`)}`);
      return;
    }
    router.push(`/courses/${course.slug}/enroll`);
  };

  return (
    <button
      type="button"
      onClick={handleEnrollClick}
      className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
    >
      এনরোল করুন
    </button>
  );
}
