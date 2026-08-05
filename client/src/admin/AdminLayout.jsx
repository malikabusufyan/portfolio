import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/messages", label: "Messages" },
];

export default function AdminLayout() {
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="flex w-60 shrink-0 flex-col border-r border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Portfolio Admin</p>
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">{email}</p>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="mb-2 block rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          View site ↗
        </a>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
        >
          Log out
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
