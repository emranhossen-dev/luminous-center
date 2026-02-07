import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCourses } from "@/app/data/courses";
import CourseEnrollButton from "./CourseEnrollButton";

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const courses = getAllCourses();
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) notFound();

  return (
    <main className="flex-grow pt-16">
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-6">
          <Link href="/courses" className="text-indigo-600 hover:underline mb-6 inline-block">
            ← সকল কোর্স
          </Link>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-700 mb-4">
              {course.projectLabel}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
            <p className="text-gray-600">
              এই কোর্সে আপনি হাতে-কলমে শিখবেন এবং প্রজেক্ট ভিত্তিক দক্ষতা অর্জন করবেন। রেজিস্ট্রেশন করতে লগইন বা সাইন আপ করুন।
            </p>
            {course.project !== "govt" && (
              <p className="text-gray-600 mt-2">
                কোর্স ফি: <strong>৳{course.fee.toLocaleString()} BDT</strong>
              </p>
            )}
            <div className="mt-8 flex gap-4">
              <CourseEnrollButton course={course} />
              <Link
                href="/contact"
                className="bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
              >
                যোগাযোগ করুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
