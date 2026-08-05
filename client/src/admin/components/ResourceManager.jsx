import { useEffect, useState } from "react";
import api from "../../api/client";

// Generic CRUD screen driven by a field config, used for Projects/Skills/Experience.
export default function ResourceManager({ title, endpoint, fields, emptyItem, renderSummary }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setStatus("loading");
    try {
      const { data } = await api.get(endpoint);
      setItems(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  function startCreate() {
    setForm(emptyItem);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function startEdit(item) {
    const next = { ...emptyItem };
    for (const field of fields) {
      const value = item[field.name];
      next[field.name] = field.type === "list" ? (value || []).join("\n") : value ?? "";
    }
    setForm(next);
    setEditingId(item._id);
    setShowForm(true);
    setError("");
  }

  function handleFieldChange(field, value) {
    setForm((f) => ({ ...f, [field.name]: value }));
  }

  function buildPayload() {
    const payload = {};
    for (const field of fields) {
      const raw = form[field.name];
      if (field.type === "list") {
        payload[field.name] = raw ? raw.split("\n").map((s) => s.trim()).filter(Boolean) : [];
      } else if (field.type === "checkbox") {
        payload[field.name] = !!raw;
      } else if (field.type === "number") {
        payload[field.name] = raw === "" ? 0 : Number(raw);
      } else {
        payload[field.name] = raw;
      }
    }
    return payload;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const payload = buildPayload();
      if (editingId) {
        await api.put(`${endpoint}/${editingId}`, payload);
      } else {
        await api.post(endpoint, payload);
      }
      setShowForm(false);
      await load();
    } catch {
      setError("Could not save. Check the fields and try again.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    await api.delete(`${endpoint}/${id}`);
    await load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>
        <button
          type="button"
          onClick={startCreate}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          + Add new
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {editingId ? "Edit item" : "New item"}
          </h2>

          {fields.map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.label}
              </label>
              {field.type === "textarea" || field.type === "list" ? (
                <textarea
                  rows={field.type === "list" ? 4 : 3}
                  value={form[field.name] ?? ""}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-indigo-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                />
              ) : field.type === "select" ? (
                <select
                  value={form[field.name] ?? ""}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-indigo-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={!!form[field.name]}
                  onChange={(e) => handleFieldChange(field, e.target.checked)}
                  className="h-4 w-4"
                />
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  value={form[field.name] ?? ""}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-indigo-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                />
              )}
            </div>
          ))}

          {error && <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {status === "loading" && <p className="text-gray-500 dark:text-gray-400">Loading…</p>}
      {status === "error" && <p className="text-red-600 dark:text-red-400">Failed to load {title.toLowerCase()}.</p>}

      {status === "ready" && (
        <div className="space-y-3">
          {items.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">Nothing here yet — add your first item.</p>
          )}
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="min-w-0">{renderSummary(item)}</div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
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
