import React, { useState, useEffect } from "react";

export default function AddTransactionModal({
  isOpen,
  onClose,
  onAdd,
  editItem,
}) {
  // Hooks at the very top
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Reset form when modal opens or editItem changes
  useEffect(() => {
    if (editItem) {
      setType(editItem.type || "expense");
      setAmount(editItem.amount || "");
      setCategory(editItem.category || "Salary");
      setDate(editItem.date || "");
      setDescription(editItem.description || "");
    } else {
      setType("expense");
      setAmount("");
      setCategory("Salary");
      setDate("");
      setDescription("");
    }
  }, [editItem, isOpen]);

  if (!isOpen) return null; // now safe

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      ...(editItem && { id: editItem.id }),
      type,
      amount: parseFloat(amount),
      category,
      date,
      description,
    };

    onAdd(newTransaction);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-gray-400 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {editItem ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <div className="flex mb-4 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg ${
              type === "expense" ? "bg-white shadow" : ""
            }`}
            onClick={() => setType("expense")}
          >
            Expense
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg ${
              type === "income" ? "bg-white shadow" : ""
            }`}
            onClick={() => setType("income")}
          >
            Income
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold">Amount *</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Category *</label>
            <select
              className="w-full border rounded-lg p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option>Salary</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Shopping</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Date *</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Description *</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="e.g., grocery shopping"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            {editItem ? "Save Changes" : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
