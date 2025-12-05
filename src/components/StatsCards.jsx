import React from "react";

function Card({ title, value, color = "green" }) {
  const colorClass = color === "red" ? "text-red-600" : "text-green-600";
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex-1">
      <div className="text-sm text-gray-500">{title}</div>
      <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
    </div>
  );
}

export default function StatsCards({ totals }) {
  if (!totals) return null; // or a loading spinner
  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <Card title="Total Income" value={`$${totals.income.toFixed(2)}`} />
      <Card
        title="Total Expense"
        value={`$${totals.expense.toFixed(2)}`}
        color="red"
      />
      <Card title="Net Balance" value={`$${totals.net.toFixed(2)}`} />
    </div>
  );
}
