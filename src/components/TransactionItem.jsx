import React from "react";

export default function TransactionItem({ tx, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 rounded-full" style={{ background: tx.type === "income" ? "#34D399" : "#EF4444" }} />
        <div>
          <div className="font-semibold">{tx.description}</div>
          <div className="text-xs text-gray-400">{tx.category} • {tx.date}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className={`${tx.type === "income" ? "text-green-600" : "text-red-500"} font-semibold`}>
          {tx.type === "income" ? "+" : "-"}${Number(tx.amount).toFixed(2)}
        </div>
        <button onClick={() => onEdit(tx)} className="p-2 rounded hover:bg-gray-100">✏️</button>
        <button onClick={() => onDelete(tx.id)} className="p-2 rounded hover:bg-gray-100">🗑️</button>
      </div>
    </div>
  );
}
