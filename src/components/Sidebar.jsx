import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white h-screen border-r px-6 py-8 flex flex-col">
      <div className="mb-8">
        <div className="text-2xl font-bold text-green-600">Finance</div>
        <div className="text-sm text-gray-400">Personal Tracker</div>
      </div>

      <nav className="flex flex-col gap-2 text-gray-700">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 text-green-600 font-medium">
          <span>📊</span> Dashboard
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">✈️ Transactions</button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">🏷️ Categories</button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">📈 Analytics</button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">⚙️ Settings</button>
      </nav>

      <div className="mt-auto">
        <button className="w-full text-left px-4 py-3 rounded-lg border">Sign Out</button>
      </div>
    </aside>
  );
}
