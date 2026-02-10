import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">

        {/* Logo */}
        <div className="px-6 py-5 text-2xl font-bold border-b border-gray-700">
          🚀 Intern Panel
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-indigo-600 shadow"
                  : "hover:bg-gray-700"
              }`
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-indigo-600 shadow"
                  : "hover:bg-gray-700"
              }`
            }
          >
            ✅ Tasks
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-700 transition"
          >
            🚪 Logout
          </button>
        </div>

      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              U
            </div>
            <span className="text-gray-600 text-sm">Welcome</span>
          </div>
        </header>

        {/* Content */}
        <section className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </section>

      </main>

    </div>
  );
}
