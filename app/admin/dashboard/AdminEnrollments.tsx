"use client";

import { useEffect, useState } from "react";

interface Enrollment {
  id: string;
  user_id: string;
  user_name: string | null;
  user_email: string | null;
  course_slug: string;
  course_title: string;
  project_label: string;
  enrolled_at: string;
  method: string;
  tran_id: string | null;
  created_at: string;
}

export default function AdminEnrollments({ token }: { token: string }) {
  const [list, setList] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/enrollments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (!cancelled) setList(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error loading enrollments");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  if (loading) return <div className="text-gray-500">Loading enrollments...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600">
          Enrollments are stored in the database when you sync from the app. If this list is empty, run the schema and optionally add an API to sync enrollments from the app to Supabase.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">Student</th>
              <th className="text-left p-3 font-semibold text-gray-700">Course</th>
              <th className="text-left p-3 font-semibold text-gray-700">Project</th>
              <th className="text-left p-3 font-semibold text-gray-700">Method</th>
              <th className="text-left p-3 font-semibold text-gray-700">Enrolled</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No enrollments in database yet.
                </td>
              </tr>
            ) : (
              list.map((e) => (
                <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="p-3">
                    <div className="font-medium text-gray-800">{e.user_name ?? "—"}</div>
                    <div className="text-gray-500 text-xs">{e.user_email ?? "—"}</div>
                    <div className="text-gray-400 text-xs">{e.user_id}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{e.course_title}</div>
                    <div className="text-gray-500 text-xs">{e.course_slug}</div>
                  </td>
                  <td className="p-3">{e.project_label}</td>
                  <td className="p-3">{e.method}</td>
                  <td className="p-3 text-gray-600">{new Date(e.enrolled_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
