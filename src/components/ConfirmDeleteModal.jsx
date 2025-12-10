// src/components/ConfirmDeleteModal.jsx
import React from "react";
import { createPortal } from "react-dom";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999] px-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this transaction?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body   // ✅ render at root
  );
}
