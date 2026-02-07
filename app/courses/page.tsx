"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllCourses, PROJECT_NAMES, type ProjectType } from "@/app/data/courses";

const allCourses = getAllCourses();
const PROJECTS: { value: ProjectType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "govt", label: PROJECT_NAMES.govt },
  { value: "paid", label: PROJECT_NAMES.paid },
  { value: "online", label: PROJECT_NAMES.online },
];

const PER_PAGE = 9;

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState<ProjectType | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.projectLabel.toLowerCase().includes(search.toLowerCase());
      const matchProject = projectFilter === "all" || c.project === projectFilter;
      return matchSearch && matchProject;
    });
  }, [search, projectFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  return (
    <main className="flex-grow">
      <div className="bg-gray-50 min-h-screen pt-16">
        <div className="container mx-auto px-6 py-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">আমাদের সকল কোর্স</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              আপনার পছন্দের স্কিলটি খুঁজে নিন এবং আজই আপনার শেখার যাত্রা শুরু করুন।
            </p>
          </header>

          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
              <div className="relative w-full md:w-1/2 lg:w-1/3">
                <input
                  type="text"
                  placeholder="কোর্সের নাম দিয়ে খুঁজুন..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {PROJECTS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => {
                    setProjectFilter(value);
                    setPage(1);
                  }}
                  className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
                    projectFilter === value
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <main>
            {paginated.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-700">দুঃখিত, কোনো কোর্স পাওয়া যায়নি।</h3>
                <p className="text-gray-500 mt-2">আপনার সার্চ বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 mb-3">
                        {course.projectLabel}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
                      <span className="text-indigo-600 font-medium text-sm">বিস্তারিত দেখুন →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>

          <div className="mt-16 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed enabled:bg-white enabled:border enabled:border-gray-300 enabled:hover:bg-gray-50 enabled:cursor-pointer enabled:text-gray-700"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-lg ${page === p ? "bg-indigo-600 text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed enabled:bg-white enabled:border enabled:border-gray-300 enabled:hover:bg-gray-50 enabled:cursor-pointer enabled:text-gray-700"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
