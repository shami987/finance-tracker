import React, { useMemo, useState } from "react";
import Filters from "./Filters";
import StatsCards from "./StatsCards";
import TransactionsList from "./TransactionsList";
import AddTransactionModal from "./AddTransactionModal";
import useFirebaseTransactions from "../hooks/useFirebaseTransactions";
import { exportTransactionsToCsv } from "../utils/exportCsv";
import Layout from "./Layout";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "./ConfirmDeleteModal";


export default function TransactionsPage() {
  const {
    transactions = [],
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useFirebaseTransactions();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState("");


  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
  });

  const categories = useMemo(() => {
    const setCats = new Set();
    transactions.forEach((t) => t.category && setCats.add(t.category));
    return Array.from(setCats);
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (filters.search) {
        const s = filters.search.toLowerCase();
        const desc = (t.description || "").toLowerCase();
        const cat = (t.category || "").toLowerCase();
        if (!desc.includes(s) && !cat.includes(s)) return false;
      }
      if (filters.type !== "all" && t.type !== filters.type) return false;
      if (filters.category !== "all" && t.category !== filters.category)
        return false;
      return true;
    });
  }, [transactions, filters]);

  const totals = useMemo(() => {
    const totals = { income: 0, expense: 0, net: 0 };
    filtered.forEach((t) => {
      if (t.type === "income") totals.income += Number(t.amount || 0);
      else totals.expense += Number(t.amount || 0);
    });
    totals.net = totals.income - totals.expense;
    return totals;
  }, [filtered]);

  function handleAddClick() {
    setEditItem(null);
    setModalOpen(true);
  }

  function handleSave(tx) {
    if (tx.id) {
      updateTransaction(tx.id, tx);
    } else {
      addTransaction(tx);
    }
    setModalOpen(false);
  }

  function handleEdit(item) {
    setEditItem(item);
    setModalOpen(true);
  }

  function clearFilters() {
    setFilters({ search: "", type: "all", category: "all" });
  }
//handler to open the modal
  function handleDelete(id, description) {
  setDeleteId(id);
  setDeleteItemName(description);
  setDeleteModalOpen(true);
}

function confirmDelete() {
  if (deleteId) {
    deleteTransaction(deleteId);
    toast.info(`Transaction "${deleteItemName}" deleted successfully!`);
  }
  setDeleteModalOpen(false);
  setDeleteId(null);
  setDeleteItemName("");
}



  return (
    <Layout pageTitle="Transactions">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Transactions</h2>
          <p className="text-gray-500">
            View and manage all your financial transactions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => exportTransactionsToCsv(filtered)}
            className="bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50 transition-colors w-full sm:w-auto text-left"
          >
            ⤓ Export CSV
          </button>

          <button
            onClick={handleAddClick}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors w-full sm:w-auto text-center"
          >
            + Add Transaction
          </button>
        </div>
      </div>

      <StatsCards totals={totals} />

      <div className="space-y-4">
        <Filters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          clearFilters={clearFilters}
        />

        <TransactionsList
          transactions={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleSave}
        editItem={editItem}
      />
      <ConfirmDeleteModal
  isOpen={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
  onConfirm={confirmDelete}
  itemName={deleteItemName}
/>

    </Layout>
  );
}
