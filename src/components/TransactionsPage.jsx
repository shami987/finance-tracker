import React, { useMemo, useState } from "react";
import Filters from "./Filters";
import StatsCards from "./StatsCards";
import TransactionsList from "./TransactionsList";
import AddTransactionModal from "./AddTransactionModal";
import useFirebaseTransactions from "../hooks/useFirebaseTransactions";
import { exportTransactionsToCsv } from "../utils/exportCsv";
import Layout from "./Layout";

export default function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useFirebaseTransactions();

  // UI state
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
  });

  // derive categories list from transactions
  const categories = useMemo(() => {
    const set = new Set(transactions.map((t) => t.category).filter(Boolean));
    return [...set];
  }, [transactions]);

  // totals
  const totals = useMemo(() => {
    let income = 0,
      expense = 0;
    transactions.forEach((t) => {
      const amt = Number(t.amount) || 0;
      if (t.type === "income") income += amt;
      else expense += amt;
    });
    return { income, expense, net: income - expense };
  }, [transactions]);

  // filtered transactions
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (
        filters.search &&
        !`${t.description} ${t.category}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.type !== "all" && t.type !== filters.type) return false;
      if (filters.category !== "all" && t.category !== filters.category)
        return false;
      return true;
    });
  }, [transactions, filters]);

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
  }

  function handleEdit(item) {
    setEditItem(item);
    setModalOpen(true);
  }

  function clearFilters() {
    setFilters({ search: "", type: "all", category: "all" });
  }

  return (
    <Layout pageTitle="Transactions">
      {/* Transactions Header with description and buttons */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-500">
            View and manage all your financial transactions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportTransactionsToCsv(filtered)}
            className="bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50 transition-colors"
          >
            ⤓ Export CSV
          </button>

          <button
            onClick={handleAddClick}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors"
          >
            + Add Transaction
          </button>
        </div>
      </div>

      <StatsCards totals={totals} />
      <Filters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        clearFilters={clearFilters}
      />
      <TransactionsList
        transactions={filtered}
        onEdit={handleEdit}
        onDelete={deleteTransaction}
      />

      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleSave}
        editItem={editItem}
      />
    </Layout>
  );
}
