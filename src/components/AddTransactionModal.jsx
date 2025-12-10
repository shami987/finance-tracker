// src/components/AddTransactionModal.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";   // ✅ import createPortal

export default function AddTransactionModal({
  isOpen,
  onClose,
  onAdd,
  editItem,
}) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const categories = ["Salary", "Food", "Transport", "Entertainment", "Shopping"];

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

  if (!isOpen) return null;

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
    toast.success(editItem ? "Transaction updated successfully!" : "Transaction added successfully!");
    onClose();
  };

  // ✅ Use createPortal so modal renders into document.body
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999] px-4">
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

        {/* Expense / Income Toggle */}
        <div className="flex mb-4 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg ${type === "expense" ? "bg-white shadow" : ""}`}
            onClick={() => setType("expense")}
          >
            Expense
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg ${type === "income" ? "bg-white shadow" : ""}`}
            onClick={() => setType("income")}
          >
            Income
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
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

          {/* Category Dropdown */}
          <div>
            <label className="font-semibold">Category *</label>
            <div className="mt-2 relative">
              <button
                type="button"
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="w-full px-3 py-2 sm:py-3 border rounded-lg flex items-center justify-between text-sm sm:text-base"
              >
                <span>{category}</span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${categoryOpen ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {categoryOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-20">
                  {categories.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setCategory(option);
                        setCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 sm:py-3 hover:bg-gray-50 text-sm sm:text-base"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date */}
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

          {/* Description */}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            {editItem ? "Save Changes" : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
