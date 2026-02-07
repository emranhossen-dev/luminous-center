"use client";

import { useEffect, useState } from "react";

interface Submission {
  id: string;
  course_slug: string;
  homework_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  files: Record<string, string>;
  mark: number | null;
  feedback: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export default function AdminSubmissions({ token }: { token: string }) {
  const [list, setList] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mark, setMark] = useState("");
  const [feedback, setFeedback] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error loading submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  const handleSaveReview = async (id: string) => {
    const numMark = mark.trim() === "" ? null : parseInt(mark, 10);
    if (numMark !== null && (numMark < 0 || numMark > 100)) return;
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mark: numMark ?? undefined,
          feedback: feedback.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      setEditingId(null);
      setMark("");
      setFeedback("");
      fetchList();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Update failed");
    }
  };

  if (loading) return <div className="text-gray-500">Loading submissions...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">Student</th>
              <th className="text-left p-3 font-semibold text-gray-700">Course / Homework</th>
              <th className="text-left p-3 font-semibold text-gray-700">Submitted</th>
              <th className="text-left p-3 font-semibold text-gray-700">Mark / Feedback</th>
              <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No homework submissions yet.
                </td>
              </tr>
            ) : (
              list.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="p-3">
                    <div className="font-medium text-gray-800">{s.user_name}</div>
                    <div className="text-gray-500 text-xs">{s.user_email}</div>
                    <div className="text-gray-400 text-xs">{s.user_id}</div>
                  </td>
                  <td className="p-3">
                    <div>{s.course_slug}</div>
                    <div className="text-gray-500">HW: {s.homework_id}</div>
                  </td>
                  <td className="p-3 text-gray-600">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="p-3">
                    {editingId === s.id ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          placeholder="Mark (0-100)"
                          value={mark}
                          onChange={(e) => setMark(e.target.value)}
                          className="w-20 px-2 py-1 border rounded"
                        />
                        <textarea
                          placeholder="Feedback"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="w-full px-2 py-1 border rounded text-xs"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveReview(s.id)}
                            className="px-2 py-1 bg-indigo-600 text-white rounded text-xs"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => { setEditingId(null); setMark(""); setFeedback(""); }}
                            className="px-2 py-1 bg-gray-200 rounded text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {s.mark != null && <span className="font-medium">{s.mark}/100</span>}
                        {s.feedback && <div className="text-gray-600 text-xs mt-0.5">{s.feedback}</div>}
                        {s.reviewed_at && (
                          <div className="text-gray-400 text-xs">Reviewed {new Date(s.reviewed_at).toLocaleString()}</div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                      className="text-indigo-600 hover:underline text-xs mr-2"
                    >
                      {expandedId === s.id ? "Hide code" : "View code"}
                    </button>
                    {editingId !== s.id && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(s.id);
                          setMark(s.mark != null ? String(s.mark) : "");
                          setFeedback(s.feedback ?? "");
                        }}
                        className="text-indigo-600 hover:underline text-xs"
                      >
                        Review / Mark
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {expandedId && list.find((s) => s.id === expandedId) && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <h3 className="font-semibold text-gray-800 mb-2">Submitted files</h3>
          {Object.entries(list.find((s) => s.id === expandedId)!.files).map(([name, content]) => (
            <div key={name} className="bg-white rounded border p-3 mb-2">
              <div className="text-xs font-mono text-gray-600 mb-1">{name}</div>
              <pre className="text-xs overflow-x-auto max-h-40 overflow-y-auto whitespace-pre-wrap break-words">
                {content}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
