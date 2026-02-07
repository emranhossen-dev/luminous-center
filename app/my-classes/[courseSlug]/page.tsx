"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEnrollment } from "@/context/EnrollmentContext";
import { getAllCourses } from "@/app/data/courses";
import {
  getClassContent,
  getMilestoneByModuleId,
  getHomeworkByMilestone,
} from "@/app/data/classContent";

export default function ClassPage() {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params.courseSlug as string;
  const { user, isLoading: authLoading } = useAuth();
  const { enrollments, isEnrolled } = useEnrollment();
  const [moduleSearch, setModuleSearch] = useState("");
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const courses = getAllCourses();
  const course = courses.find((c) => c.slug === courseSlug);
  const { milestones, modules } = course ? getClassContent(course.title) : { milestones: [], modules: [] };

  const currentModule = modules[currentModuleIndex] ?? null;
  const currentMilestone = currentModule && course ? getMilestoneByModuleId(course.title, currentModule.id) : null;
  const assignmentForCurrentMilestone =
    currentMilestone && course ? getHomeworkByMilestone(course.title, currentMilestone.id) : null;
  const showHomework = !!assignmentForCurrentMilestone;

  const filteredMilestones = useMemo(() => {
    if (!moduleSearch.trim()) return milestones;
    const q = moduleSearch.toLowerCase();
    return milestones.filter(
      (ms) =>
        ms.title.toLowerCase().includes(q) ||
        ms.modules.some((m) => m.title.toLowerCase().includes(q))
    );
  }, [milestones, moduleSearch]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login?returnUrl=" + encodeURIComponent("/my-classes/" + courseSlug));
      return;
    }
    if (!course || !isEnrolled(courseSlug)) {
      router.replace("/my-classes");
      return;
    }
  }, [user, authLoading, course, courseSlug, isEnrolled, router]);

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

  const goPrev = () => setCurrentModuleIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentModuleIndex((i) => Math.min(modules.length - 1, i + 1));

  return (
    <main className="flex-grow pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/my-classes" className="text-indigo-600 hover:underline">
            আমার ক্লাস
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-800">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Video */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video">
              {currentModule ? (
                <video
                  key={currentModule.id}
                  src={currentModule.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {modules.length === 0 ? "এই কোর্সে কোনো মডিউল নেই।" : "একটি মডিউল সিলেক্ট করুন"}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentModuleIndex <= 0}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-600">
                Class {currentModuleIndex + 1} of {modules.length}
                {currentMilestone && (
                  <span className="text-gray-500"> · {currentMilestone.title}</span>
                )}
              </span>
              <button
                type="button"
                onClick={goNext}
                disabled={currentModuleIndex >= modules.length - 1}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>

            {/* Homework after every module: docs + Start Homework → playground */}
            {showHomework && assignmentForCurrentMilestone && (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-amber-50">
                  <h2 className="text-lg font-bold text-gray-800">Homework</h2>
                  <p className="text-sm text-gray-600 mt-1">{assignmentForCurrentMilestone.title}</p>
                </div>
                <div className="p-4 prose prose-sm max-w-none text-gray-700">
                  <p>{assignmentForCurrentMilestone.description}</p>
                  {assignmentForCurrentMilestone.documentation && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap font-mono text-sm">
                      {assignmentForCurrentMilestone.documentation}
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <Link
                    href={`/my-classes/${courseSlug}/homework/${assignmentForCurrentMilestone.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  >
                    Start Homework
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right: Search + Roadmap (milestones → 5 modules → 1 assignment each) */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-fit lg:max-h-[calc(100vh-8rem)]">
            <div className="p-3 border-b border-gray-100">
              <input
                type="text"
                placeholder="Search milestone or module..."
                value={moduleSearch}
                onChange={(e) => setModuleSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Roadmap · 50 classes
              </div>
              {filteredMilestones.map((ms) => (
                <div key={ms.id} className="border-b border-gray-100 last:border-0">
                  <div className="px-3 py-2 bg-gray-50 font-semibold text-gray-800 text-sm sticky top-0 z-10">
                    {ms.title}
                  </div>
                  <ul className="divide-y divide-gray-50">
                    {ms.modules.map((mod) => {
                      const isActive = currentModule?.id === mod.id;
                      const globalIndex = modules.findIndex((m) => m.id === mod.id);
                      return (
                        <li key={mod.id}>
                          <button
                            type="button"
                            onClick={() => setCurrentModuleIndex(globalIndex >= 0 ? globalIndex : 0)}
                            className={`w-full text-left px-4 py-2.5 text-sm transition ${
                              isActive
                                ? "bg-indigo-50 text-indigo-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-gray-500 font-mono text-xs">Class {mod.order}</span>
                            <span className="block mt-0.5 truncate">{mod.title}</span>
                          </button>
                        </li>
                      );
                    })}
                    <li>
                      <div className="px-4 py-2.5 text-sm border-l-2 border-amber-300 bg-amber-50/50">
                        <span className="text-xs font-medium text-amber-800">Homework</span>
                        <span className="block mt-0.5 text-gray-700 truncate">{ms.assignment.title}</span>
                        <Link
                          href={`/my-classes/${courseSlug}/homework/${ms.assignment.id}`}
                          className="inline-block mt-1 text-xs text-indigo-600 hover:underline"
                        >
                          Start Homework →
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
              {filteredMilestones.length === 0 && (
                <div className="p-4 text-center text-gray-500 text-sm">No milestones or modules match your search.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
