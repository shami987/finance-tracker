import React from "react";
import { NavLink } from "react-router-dom";
import { Grid2X2, Send, Tag, BarChart3, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white h-screen border-r px-6 py-8 flex flex-col">
      <div className="mb-8">
        <div className="text-2xl font-bold text-green-600">Finance</div>
        <div className="text-sm text-gray-400">Personal Tracker</div>
      </div>

      <nav className="flex flex-col gap-4 text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive
                ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Grid2X2 size={20} /> Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive
                ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Send size={20} /> Transactions
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive
                ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Tag size={20} /> Categories
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive
                ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <BarChart3 size={20} /> Analytics
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive
                ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Settings size={20} /> Settings
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
