"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEnrollment } from "@/context/EnrollmentContext";
import { getAllCourses } from "@/app/data/courses";

export default function MyClassesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const { enrollments, addEnrollment, isEnrolled } = useEnrollment();

  const enrolledSlug = searchParams.get("enrolled");
  const tranId = searchParams.get("tran_id");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login?returnUrl=/my-classes");
      return;
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user || !enrolledSlug) return;
    if (isEnrolled(enrolledSlug)) {
      router.replace("/my-classes", { scroll: false });
      return;
    }
    const courses = getAllCourses();
    const course = courses.find((c) => c.slug === enrolledSlug);
    if (!course) return;
    addEnrollment({
      courseSlug: course.slug,
      courseId: course.id,
      courseTitle: course.title,
      projectLabel: course.projectLabel,
      method: "payment",
      tranId: tranId || undefined,
    });
    router.replace("/my-classes", { scroll: false });
  }, [enrolledSlug, tranId, user?.id, isEnrolled, addEnrollment, router]);

  if (authLoading) {
    return (
      <main className="flex-grow pt-16 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">লোড হচ্ছে...</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex-grow pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">আমার ক্লাসসমূহ</h1>
        <p className="text-gray-600 mb-8">আপনি যে কোর্সগুলোতে এনরোল করেছেন সেগুলো এখানে দেখতে পাবেন।</p>

        {enrollments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.5m0 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">কোনো কোর্সে এনরোল নেই</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              কোর্সগুলো দেখুন এবং এনরোল করুন। Govt প্রজেক্টের জন্য রেজিস্ট্রেশন ফর্ম, Paid/Online ব্যাচের জন্য পেমেন্টের পর অ্যাক্সেস পাবেন।
            </p>
            <Link
              href="/courses"
              className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              কোর্স ব্রাউজ করুন
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((e) => (
              <div
                key={e.courseSlug}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 mb-3">
                    {e.projectLabel}
                  </span>
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{e.courseTitle}</h2>
                  <p className="text-xs text-gray-500 mb-4">
                    এনরোল: {new Date(e.enrolledAt).toLocaleDateString("bn-BD")} • {e.method === "govt" ? "রেজিস্ট্রেশন" : "পেমেন্ট"}
                  </p>
                  <Link
                    href={`/courses/${e.courseSlug}`}
                    className="inline-block text-indigo-600 font-semibold text-sm hover:underline"
                  >
                    কোর্স বিস্তারিত →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
