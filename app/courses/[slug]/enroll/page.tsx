"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEnrollment } from "@/context/EnrollmentContext";
import { getAllCourses } from "@/app/data/courses";

export default function EnrollPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { user, isLoading: authLoading } = useAuth();
  const { addEnrollment, isEnrolled } = useEnrollment();
  const [submitting, setSubmitting] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState("");

  const courses = getAllCourses();
  const course = courses.find((c) => c.slug === slug);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace(`/login?returnUrl=${encodeURIComponent(`/courses/${slug}/enroll`)}`);
      return;
    }
    if (!course) {
      router.replace("/courses");
      return;
    }
    if (isEnrolled(slug)) {
      router.replace("/my-classes");
      return;
    }
  }, [user, authLoading, course, slug, isEnrolled, router]);

  if (authLoading || !user || !course) {
    return (
      <main className="flex-grow pt-16 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">লোড হচ্ছে...</div>
      </main>
    );
  }

  if (isEnrolled(slug)) {
    return null;
  }

  const isGovt = course.project === "govt";

  const handleGovtSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = (formData.get("fullName") as string)?.trim() || user.name;
    const phone = (formData.get("phone") as string)?.trim();
    const nid = (formData.get("nid") as string)?.trim();
    const address = (formData.get("address") as string)?.trim();
    addEnrollment({
      courseSlug: course.slug,
      courseId: course.id,
      courseTitle: course.title,
      projectLabel: course.projectLabel,
      method: "govt",
    });
    router.push("/my-classes");
    setSubmitting(false);
  };

  const handlePayment = async () => {
    setError("");
    setPaymentLoading(true);
    try {
      const res = await fetch("/api/payment/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: course.slug,
          amount: course.fee,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          courseTitle: course.title,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "পেমেন্ট শুরু করতে পারিনি");
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      throw new Error("রিডাইরেক্ট URL পাইনি");
    } catch (err) {
      setError(err instanceof Error ? err.message : "একটি ত্রুটি হয়েছে");
      setPaymentLoading(false);
    }
  };

  return (
    <main className="flex-grow pt-16 min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <Link href={`/courses/${slug}`} className="text-indigo-600 hover:underline mb-6 inline-block">
          ← কোর্সে ফিরে যান
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-700 mb-2">
              {course.projectLabel}
            </span>
            <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
            <p className="text-gray-600 mt-1">
              {isGovt
                ? "গভর্নমেন্ট প্রজেক্টের জন্য নিচের রেজিস্ট্রেশন ফর্ম পূরণ করুন।"
                : `কোর্স ফি: ৳${course.fee.toLocaleString()} BDT। পেমেন্ট সম্পন্ন হলে কোর্সে এক্সেস পাবেন।`}
            </p>
          </div>

          {isGovt ? (
            <form onSubmit={handleGovtSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  পূর্ণ নাম *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  defaultValue={user.name}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="আপনার পূর্ণ নাম"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  মোবাইল নম্বর *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="০১৭১২৩৪৫৬৭৮"
                />
              </div>
              <div>
                <label htmlFor="nid" className="block text-sm font-medium text-gray-700 mb-1">
                  জাতীয় পরিচয়পত্র নম্বর (ঐচ্ছিক)
                </label>
                <input
                  id="nid"
                  name="nid"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="NID নম্বর"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  ঠিকানা *
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="বাড়ি নম্বর, রোড, এলাকা, জেলা"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {submitting ? "সাবমিট হচ্ছে..." : "রেজিস্ট্রেশন সম্পন্ন করুন"}
              </button>
            </form>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between py-4 px-4 bg-gray-50 rounded-xl mb-4">
                <span className="text-gray-700 font-medium">কোর্স ফি</span>
                <span className="text-xl font-bold text-indigo-600">৳{course.fee.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                SSLCommerz এর মাধ্যমে নিরাপদে পেমেন্ট করুন (কার্ড, bKash, নগদ, ব্যাংক)। পেমেন্ট সফল হলে এই কোর্স আপনার My Classes এ যোগ হবে।
              </p>
              {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
              <button
                type="button"
                onClick={handlePayment}
                disabled={paymentLoading}
                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {paymentLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    পেমেন্ট পেজে যাচ্ছে...
                  </>
                ) : (
                  <>৳{course.fee.toLocaleString()} পে করুন ও এনরোল করুন</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
