import React from "react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4">Delete Category?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the "{itemName}" category? This action
          cannot be undone.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-2 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
