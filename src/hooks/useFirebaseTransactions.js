import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";

const COLLECTION_NAME = "transactions";

export default function useFirebaseTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get current user ID
  const userId = auth.currentUser?.uid;

  // Real-time listener for user's transactions
  useEffect(() => {
    if (!userId) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    try {
      // Query: get transactions for current user, ordered by newest first
      const q = query(
        collection(db, COLLECTION_NAME),
        where("userId", "==", userId)
      );

      // Real-time listener
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const txs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort by date descending (newest first)
        txs.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(txs);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up transaction listener:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [userId]);

  // Add transaction
  const addTransaction = async (data) => {
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        userId,
        type: data.type,
        amount: Number(data.amount) || 0,
        category: data.category,
        date: data.date || new Date().toISOString().slice(0, 10),
        description: data.description || "",
        createdAt: new Date().toISOString(),
      });
      console.log("Transaction added with ID:", docRef.id);
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError(err.message);
    }
  };

  // Update transaction
  const updateTransaction = async (id, updates) => {
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      console.log("Transaction updated:", id);
    } catch (err) {
      console.error("Error updating transaction:", err);
      setError(err.message);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      console.log("Transaction deleted:", id);
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError(err.message);
    }
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    loading,
    error,
  };
}
