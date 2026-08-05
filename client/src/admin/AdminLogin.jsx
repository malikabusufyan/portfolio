import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
      >
        <h1 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">Admin Login</h1>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Manage portfolio content</p>

        <div className="space-y-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none ring-indigo-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none ring-indigo-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
        </div>

        {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
