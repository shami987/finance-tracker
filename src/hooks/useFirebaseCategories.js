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

const COLLECTION = "categories";

export default function useFirebaseCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) {
      setCategories([]);
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, COLLECTION),
        where("userId", "==", userId)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(list);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Category listener error:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [userId]);

  // ADD CATEGORY
const addCategory = async (cat) => {
  if (!userId) {
    console.error("Cannot add category: user not logged in");
    return;
  }

  try {
    await addDoc(collection(db, COLLECTION), {
      userId,          // now guaranteed to be defined
      name: cat.name,
      type: cat.type,
      color: cat.color,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Error adding category:", err);
    setError(err.message);
  }
};


  // UPDATE CATEGORY
  const updateCategory = async (id, updates) => {
    try {
      const ref = doc(db, COLLECTION, id);
      await updateDoc(ref, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error updating category:", err);
      setError(err.message);
    }
  };

  // DELETE CATEGORY
  const deleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err.message);
    }
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    loading,
    error,
  };
}
