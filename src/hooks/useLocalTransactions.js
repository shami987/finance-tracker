import { useEffect, useState } from "react";

const STORAGE_KEY = "transactions_v1";

export default function useLocalTransactions() {
  const [transactions, setTransactions] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved)) {
        setTransactions(saved);
      }
    } catch (err) {
      console.error("Error reading localStorage:", err);
      setTransactions([]);
    }
  }, []);

  // Save to localStorage when list changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Add transaction
  const addTransaction = (data) => {
    const tx = {
      id: Date.now().toString(),     // generate ID ONLY here
      type: data.type,
      amount: Number(data.amount) || 0,
      category: data.category,
      date: data.date || new Date().toISOString().slice(0, 10),
      description: data.description || "",
    };

    setTransactions((prev) => [tx, ...prev]);  // newest first
  };

  // Update transaction
  const updateTransaction = (id, updates) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updates }
          : t
      )
    );
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setTransactions,
  };
}
