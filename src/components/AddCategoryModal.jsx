import React, { useState, useEffect } from "react";

export default function AddCategoryModal({ isOpen, onClose, onAdd, editItem }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Expense");
  const [color, setColor] = useState("green");
  const [colorOpen, setColorOpen] = useState(false);

  useEffect(() => {
    if (editItem) {
      setName(editItem.name || "");
      setType(editItem.type || "Expense");
      setColor(editItem.color || "green");
    } else if (isOpen) {
      setName("");
      setType("Expense");
      setColor("green");
    }
  }, [editItem, isOpen]);

  if (!isOpen) return null;

  const COLORS = [
    { id: "green", label: "green", hex: "#14b8a6" },
    { id: "blue", label: "blue", hex: "#60a5fa" },
    { id: "red", label: "red", hex: "#f87171" },
    { id: "yellow", label: "yellow", hex: "#fbbf24" },
    { id: "purple", label: "purple", hex: "#a78bfa" },
  ];

  const selectedColor = COLORS.find((c) => c.id === color) || COLORS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const category = {
      id: editItem?.id || Date.now().toString(),
      name: name.trim(),
      type,
      color,
    };
    onAdd && onAdd(category);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-gray-400 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {editItem ? "Edit Category" : "Add New Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-medium">Name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="font-medium">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg"
            >
              <option>Expense</option>
              <option>Income</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Color</label>
            <div className="mt-2 relative">
              <button
                type="button"
                onClick={() => setColorOpen(!colorOpen)}
                className="w-full px-4 py-3 border rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ background: selectedColor.hex }}
                  />
                  <span className="text-sm capitalize text-gray-700">
                    {selectedColor.label}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    colorOpen ? "transform rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {colorOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-20">
                  {COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setColor(c.id);
                        setColorOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                    >
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ background: c.hex }}
                      />
                      <span className="text-sm capitalize text-gray-700">
                        {c.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full border text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-teal-500 text-white"
            >
              {editItem ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
