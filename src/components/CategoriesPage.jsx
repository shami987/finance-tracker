import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import AddCategoryModal from "./AddCategoryModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import useFirebaseCategories from "../hooks/useFirebaseCategories";



export default function CategoriesPage() {
    const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    loading,
  } = useFirebaseCategories();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);


  const income = categories.filter((c) => c.type === "Income");
  const expense = categories.filter((c) => c.type === "Expense");

const handleAdd = (cat) => {
  if (cat.id) {
    updateCategory(cat.id, cat);
  } else {
    addCategory(cat);
  }
};

  const openNew = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const handleEdit = (cat) => {
    setEditItem(cat);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this category?")) return;
    deleteCategory(id);

  };

  const handleDeleteClick = (cat) => {
    setDeleteItem(cat);
    setDeleteOpen(true);
  };

 const handleDeleteConfirm = () => {
  if (!deleteItem) return;

  // Delete from Firebase
  deleteCategory(deleteItem.id);

  // Close the modal and clear the selected item
  setDeleteOpen(false);
  setDeleteItem(null);
};

  return (
    <Layout pageTitle="Categories">
      {/* Main Content Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Categories</h2>
          <p className="text-gray-500">Manage your transaction categories</p>
        </div>

        <button
          onClick={openNew}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          + Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Income Categories */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
            Income Categories ({income.length})
          </h3>
          {income.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No income categories yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {income.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: c.color === "green" ? "#14b8a6" : c.color,
                      }}
                    />
                    <div>{c.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-sm text-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(c)}
                      className="text-sm text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expense Categories */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-red-500 mb-4 flex items-center gap-2">
            Expense Categories ({expense.length})
          </h3>
          {expense.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No expense categories yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expense.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: c.color === "green" ? "#14b8a6" : c.color,
                      }}
                    />
                    <div>{c.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-sm text-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(c)}
                      className="text-sm text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddCategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
        editItem={editItem}
      />

      <DeleteConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={deleteItem?.name || ""}
      />
    </Layout>
  );
}
