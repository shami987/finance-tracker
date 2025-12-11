import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import Filters from "./components/Filters";
import TransactionsList from "./components/TransactionsList";
import AddTransactionModal from "./components/AddTransactionModal";
import useLocalTransactions from "./hooks/useLocalTransactions";
import { exportTransactionsToCsv } from "./utils/exportCsv";
import Login from "./components/Login";
import MainDashboard from "./components/MainDashboard";
import TransactionsPage from "./components/TransactionsPage";
import CategoriesPage from "./components/CategoriesPage";
import AnalyticsPage from "./components/AnalyticsPage";
import SettingsPage from "./components/SettingsPage";

// Main Dashboard Component
function Dashboard() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useLocalTransactions();

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
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header
          onAdd={handleAddClick}
          onExport={() => exportTransactionsToCsv(filtered)}
        />
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
      </main>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("authToken");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Main App Component with Router
export default function App() {
  return (
    <>
       <Routes>
      {/* Login Route - accessible without authentication */}
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboard Route */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainDashboard />
          </ProtectedRoute>
        }
      />

      {/* Transactions page (protected) */}
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        }
      />

      {/* Categories page (protected) */}
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        }
      />

      {/* Analytics page (protected) */}
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />

      {/* Settings page (protected) */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
          {/* ✅ Toast container goes here */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
    
  );
}
//hello world