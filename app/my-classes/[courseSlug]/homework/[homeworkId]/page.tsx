"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEnrollment } from "@/context/EnrollmentContext";
import { getAllCourses } from "@/app/data/courses";
import { getHomeworkById } from "@/app/data/classContent";
import Playground from "./Playground";

export default function HomeworkPlaygroundPage() {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params.courseSlug as string;
  const homeworkId = params.homeworkId as string;
  const { user, isLoading: authLoading } = useAuth();
  const { isEnrolled } = useEnrollment();

  const courses = getAllCourses();
  const course = courses.find((c) => c.slug === courseSlug);
  const homework = course ? getHomeworkById(course.title, homeworkId) : null;

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login?returnUrl=" + encodeURIComponent(`/my-classes/${courseSlug}/homework/${homeworkId}`));
      return;
    }
    if (!course || !isEnrolled(courseSlug)) {
      router.replace("/my-classes");
      return;
    }
  }, [user, authLoading, course, courseSlug, homeworkId, isEnrolled, router]);

  if (authLoading || !user) {
    return (
      <main className="flex-grow pt-16 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">লোড হচ্ছে...</div>
      </main>
    );
  }

  if (!course || !isEnrolled(courseSlug)) {
    return null;
  }

  if (!homework) {
    return (
      <main className="flex-grow pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">হোমওয়ার্ক খুঁজে পাওয়া যায়নি।</p>
          <Link href={`/my-classes/${courseSlug}`} className="text-indigo-600 hover:underline mt-2 inline-block">
            ক্লাসে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-16 min-h-screen flex flex-col bg-gray-900">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700 text-sm">
        <Link href={`/my-classes/${courseSlug}`} className="text-indigo-400 hover:underline">
          ক্লাস
        </Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-300">{homework.title}</span>
      </div>
      <Playground
        courseSlug={courseSlug}
        homeworkId={homeworkId}
        userId={user.id}
        userName={user.name}
        userEmail={user.email}
        initialFiles={{}}
      />
    </main>
  );
}
