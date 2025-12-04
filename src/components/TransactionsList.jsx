import React from "react";
import TransactionItem from "./TransactionItem";

export default function TransactionsList({
  transactions,
  onEdit,
  onDelete,
  onClick,
}) {
  if (!transactions.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-gray-500">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          tx={tx}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
