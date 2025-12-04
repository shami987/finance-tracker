import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white h-screen border-r px-6 py-8 flex flex-col">
      <div className="mb-8">
        <div className="text-2xl font-bold text-green-600">Finance</div>
        <div className="text-sm text-gray-400">Personal Tracker</div>
      </div>

      <nav className="flex flex-col gap-2 text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
              isActive ? "bg-green-50 text-green-600" : "hover:bg-gray-100"
            }`
          }
        >
          <span>📊</span> Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
              isActive ? "bg-green-50 text-green-600" : "hover:bg-gray-100"
            }`
          }
        >
          ✈️ Transactions
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
              isActive ? "bg-green-50 text-green-600" : "hover:bg-gray-100"
            }`
          }
        >
          🏷️ Categories
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
              isActive ? "bg-green-50 text-green-600" : "hover:bg-gray-100"
            }`
          }
        >
          📈 Analytics
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
              isActive ? "bg-green-50 text-green-600" : "hover:bg-gray-100"
            }`
          }
        >
          ⚙️ Settings
        </NavLink>
      </nav>

      <div className="mt-auto">
        <button className="w-full text-left px-4 py-3 rounded-lg border">
          Sign Out
        </button>
      </div>
    </aside>
  );
}
