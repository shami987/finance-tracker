import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatsCards from "./StatsCards";
import useFirebaseTransactions from "../hooks/useFirebaseTransactions";
import Layout from "./Layout";
import AddTransactionModal from "./AddTransactionModal";
import TransactionsList from "./TransactionsList";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";



// Sample data for the balance trend
const balanceData = [
  { date: "Jan 1", balance: 2300 },
  { date: "Jan 3", balance: 2250 },
  { date: "Jan 5", balance: 2200 },
  { date: "Jan 7", balance: 2400 },
  { date: "Jan 10", balance: 2929 },
  { date: "Jan 12", balance: 2700 },
  { date: "Jan 15", balance: 2200 },
  { date: "Jan 17", balance: 2150 },
  { date: "Jan 20", balance: 2250 },
  { date: "Jan 22", balance: 2300 },
  { date: "Jan 25", balance: 2400 },
  { date: "Jan 27", balance: 2500 },
  { date: "Today", balance: 2300 },
];

const MainDashboard = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useFirebaseTransactions();

  // UI state
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);



    // ✅ Add your delete handler here
function handleDelete(id) {
  setDeleteId(id);
  setDeleteModalOpen(true);
}

function confirmDelete() {
  if (deleteId) {
    deleteTransaction(deleteId);
    toast.info("Transaction deleted successfully!");
  }
  setDeleteModalOpen(false);
  setDeleteId(null);
}

  // Modal handlers
  const handleOpenModal = (item = null) => {
    setEditItem(item);
    setModalOpen(true);
  };
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setEditItem(null);
    setModalOpen(false);
  };

  const handleSaveTransaction = (tx) => {
    // if modal returned an id, treat as update
    if (tx && tx.id) {
      // update using updateTransaction (patch only fields)
      updateTransaction(tx.id, {
        type: tx.type,
        amount: Number(tx.amount) || 0,
        category: tx.category,
        date: tx.date,
        description: tx.description,
      });
    } else {
      // add new transaction
      addTransaction(tx);
    }
  };

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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-700">
            {payload[0].payload.date}
          </p>
          <p className="text-sm font-semibold text-teal-600">
            balance: $
            {payload[0].value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
     <Layout pageTitle="Dashboard">
    <div className="space-y-6">

      <StatsCards totals={totals} />

      {/* Balance Trend Chart */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Balance Trend
        </h2>

        <div className="h-56 sm:h-72 md:h-80 lg:h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceData}>
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
                domain={[0, 3000]}
                ticks={[0, 750, 1500, 2250, 3000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#14b8a6"
                strokeWidth={2}
                dot={{ fill: "#14b8a6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Recent Transactions
          </h2>

          <button
            onClick={() => handleOpenModal(null)}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto"
          >
            <span className="text-xl">+</span>
            <span>Add Transaction</span>
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <TransactionsList
            transactions={transactions.slice(0, 4)}
            onEdit={(item) => handleOpenModal(item)}
            onDelete={(id) => handleDelete(id)} 
            
            onClick={() => navigate("/transactions")}
          />
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onAdd={handleSaveTransaction}
        editItem={editItem}
      />
      {/* ✅ Delete Confirmation Modal */}
<ConfirmDeleteModal
  isOpen={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
  onConfirm={confirmDelete}
/>
    </div>
  </Layout>
  );
};

export default MainDashboard;