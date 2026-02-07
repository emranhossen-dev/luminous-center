"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSubmissions from "./AdminSubmissions";
import AdminEnrollments from "./AdminEnrollments";
import AdminUserAccess from "./AdminUserAccess";

const ADMIN_TOKEN_KEY = "luminous_admin_token";

type Tab = "submissions" | "enrollments" | "users";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("submissions");

  useEffect(() => {
    const t = typeof window !== "undefined" ? sessionStorage.getItem(ADMIN_TOKEN_KEY) : null;
    if (!t) {
      router.replace("/admin");
      return;
    }
    setToken(t);
  }, [router]);

  const logout = () => {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    router.replace("/admin");
  };

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-gray-500">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-indigo-600 hover:underline text-sm">
              Site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex gap-2 border-b border-gray-200 mb-6">
          {(
            [
              { id: "submissions" as Tab, label: "Homework Submissions" },
              { id: "enrollments" as Tab, label: "Enrolled Students" },
              { id: "users" as Tab, label: "User Access (Govt / Admin)" },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium ${
                tab === id ? "bg-white border border-b-0 border-gray-200 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "submissions" && <AdminSubmissions token={token} />}
        {tab === "enrollments" && <AdminEnrollments token={token} />}
        {tab === "users" && <AdminUserAccess token={token} />}
      </div>
    </main>
  );
}
