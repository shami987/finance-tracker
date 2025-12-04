import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LogOut, User } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import Sidebar from "./Sidebar";
import StatsCards from "./StatsCards";
import useLocalTransactions from "../hooks/useLocalTransactions";
import { exportTransactionsToCsv } from "../utils/exportCsv";

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
    useLocalTransactions();

  // UI state
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);

  // Load user data
  React.useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Header - Dashboard title + user profile */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              {/* User Info */}
              <div className="text-right">
                <div className="font-semibold text-sm">
                  {userData?.displayName || "User"}
                </div>
                <div className="text-xs text-gray-400">
                  {userData?.email || "user@example.com"}
                </div>
              </div>
              {/* User Avatar/Icon */}
              {userData?.photoURL ? (
                <img
                  src={userData.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <User size={15} color="white" aria-hidden />
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-10">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                >
                  <LogOut size={16} aria-hidden />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <StatsCards totals={totals} />

        {/* Balance Trend Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Balance Trend
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceData}>
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
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
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Transactions
            </h2>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <span className="text-xl">+</span>
              <span>Add Transaction</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
