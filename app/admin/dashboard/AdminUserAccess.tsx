"use client";

import { useEffect, useState } from "react";

interface UserAccess {
  id: string;
  user_id: string;
  user_email: string | null;
  user_name: string | null;
  role: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const ROLES = ["student", "admitted_govt", "admin"] as const;

export default function AdminUserAccess({ token }: { token: string }) {
  const [list, setList] = useState<UserAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formUserId, setFormUserId] = useState("");
  const [formUserEmail, setFormUserEmail] = useState("");
  const [formUserName, setFormUserName] = useState("");
  const [formRole, setFormRole] = useState<string>("admitted_govt");
  const [formNotes, setFormNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/user-access", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error loading user access");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUserId.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/user-access", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: formUserId.trim(),
          user_email: formUserEmail.trim() || undefined,
          user_name: formUserName.trim() || undefined,
          role: formRole,
          notes: formNotes.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setShowForm(false);
      setFormUserId("");
      setFormUserEmail("");
      setFormUserName("");
      setFormNotes("");
      fetchList();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-500">Loading user access...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Admit students to govt project or set admin role. Use <strong>admitted_govt</strong> to mark a user as admitted to a government project.
        </p>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          {showForm ? "Cancel" : "Add / Update User Access"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User ID *</label>
            <input
              type="text"
              value={formUserId}
              onChange={(e) => setFormUserId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Same ID as in app (e.g. from login)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formUserName}
              onChange={(e) => setFormUserName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formUserEmail}
              onChange={(e) => setFormUserEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">User</th>
              <th className="text-left p-3 font-semibold text-gray-700">Role</th>
              <th className="text-left p-3 font-semibold text-gray-700">Notes</th>
              <th className="text-left p-3 font-semibold text-gray-700">Updated</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No user access records. Add one above.
                </td>
              </tr>
            ) : (
              list.map((u) => (
                <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="p-3">
                    <div className="font-medium text-gray-800">{u.user_name ?? "—"}</div>
                    <div className="text-gray-500 text-xs">{u.user_email ?? "—"}</div>
                    <div className="text-gray-400 text-xs">{u.user_id}</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      u.role === "admin" ? "bg-red-100 text-red-800" :
                      u.role === "admitted_govt" ? "bg-green-100 text-green-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{u.notes ?? "—"}</td>
                  <td className="p-3 text-gray-500 text-xs">{new Date(u.updated_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
