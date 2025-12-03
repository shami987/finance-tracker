import React from "react";

export default function Header({ onAdd, onExport }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-gray-500">View and manage all your financial transactions</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onExport}
          className="bg-white px-4 py-2 rounded-lg border shadow-sm"
        >
          ⤓ Export CSV
        </button>

        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Transaction
        </button>

        <div className="ml-4 text-right">
          <div className="font-semibold">John Doe</div>
          <div className="text-xs text-gray-400">john@example.com</div>
        </div>
      </div>
    </div>
  );
}
