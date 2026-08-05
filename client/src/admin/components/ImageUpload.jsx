import { useRef, useState } from "react";
import api from "../../api/client";

export default function ImageUpload({ value, onChange }) {
  const inputRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | error
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await api.post("/upload", formData);
      onChange(data.url);
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Upload failed. Check the file (max 5MB, images only) and try again.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-contain p-1" />
          ) : (
            <span className="text-xs text-gray-400">No logo</span>
          )}
        </div>

        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={status === "uploading"}
            className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-500 dark:text-gray-300"
          />
          {status === "uploading" && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Uploading…</p>}
          {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="mt-1 text-xs font-medium text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
