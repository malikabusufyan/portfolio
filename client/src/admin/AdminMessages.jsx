import { useEffect, useState } from "react";
import api from "../api/client";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading");

  async function load() {
    setStatus("loading");
    try {
      const { data } = await api.get("/messages");
      setMessages(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(id, read) {
    await api.patch(`/messages/${id}`, { read });
    await load();
  }

  async function remove(id) {
    if (!window.confirm("Delete this message?")) return;
    await api.delete(`/messages/${id}`);
    await load();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Messages</h1>

      {status === "loading" && <p className="text-gray-500 dark:text-gray-400">Loading…</p>}
      {status === "error" && <p className="text-red-600 dark:text-red-400">Failed to load messages.</p>}

      {status === "ready" && (
        <div className="space-y-3">
          {messages.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
          )}
          {messages.map((m) => (
            <div
              key={m._id}
              className={`rounded-xl border p-4 dark:border-gray-800 dark:bg-gray-900 ${
                m.read ? "border-gray-200 bg-white" : "border-indigo-300 bg-indigo-50 dark:bg-indigo-950/30"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {m.name} <span className="font-normal text-gray-500 dark:text-gray-400">&lt;{m.email}&gt;</span>
                  </p>
                  {m.subject && <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{m.subject}</p>}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(m.createdAt).toLocaleString()} · {m.mailSent ? "emailed" : "email failed"}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">{m.message}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => markRead(m._id, !m.read)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200"
                >
                  Mark as {m.read ? "unread" : "read"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(m._id)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 dark:border-red-900 dark:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
