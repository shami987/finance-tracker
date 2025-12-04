import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useFirebaseTransactions from "../hooks/useFirebaseTransactions";
import Layout from "./Layout";

const COLORS = ["#14b8a6", "#f87171", "#fbbf24", "#60a5fa", "#a78bfa"];

export default function AnalyticsPage() {
  const { transactions } = useFirebaseTransactions();

  // Calculate analytics data
  const analyticsData = useMemo(() => {
    const byCategory = {};
    const byMonth = {};
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t) => {
      const amt = Number(t.amount) || 0;

      // By category
      if (!byCategory[t.category]) {
        byCategory[t.category] = { income: 0, expense: 0 };
      }
      if (t.type === "income") {
        byCategory[t.category].income += amt;
        totalIncome += amt;
      } else {
        byCategory[t.category].expense += amt;
        totalExpense += amt;
      }

      // By month
      const date = new Date(t.date);
      const month = date.toLocaleString("default", { month: "short" });
      if (!byMonth[month]) {
        byMonth[month] = { income: 0, expense: 0 };
      }
      if (t.type === "income") {
        byMonth[month].income += amt;
      } else {
        byMonth[month].expense += amt;
      }
    });

    // Format data for charts
    const categoryData = Object.entries(byCategory).map(([name, data]) => ({
      name,
      income: data.income,
      expense: data.expense,
    }));

    const monthData = Object.entries(byMonth).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    }));

    const typeData = [
      { name: "Income", value: totalIncome },
      { name: "Expense", value: totalExpense },
    ];

    return { categoryData, monthData, typeData, totalIncome, totalExpense };
  }, [transactions]);

  return (
    <Layout pageTitle="Analytics">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Income</p>
          <p className="text-3xl font-bold text-green-600">
            $
            {analyticsData.totalIncome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 text-sm font-medium mb-2">
            Total Expense
          </p>
          <p className="text-3xl font-bold text-red-600">
            $
            {analyticsData.totalExpense.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 text-sm font-medium mb-2">Net Balance</p>
          <p
            className={`text-3xl font-bold ${
              analyticsData.totalIncome - analyticsData.totalExpense >= 0
                ? "text-teal-600"
                : "text-red-600"
            }`}
          >
            $
            {(
              analyticsData.totalIncome - analyticsData.totalExpense
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Trend */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Monthly Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.monthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#14b8a6" />
              <Bar dataKey="expense" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income vs Expense */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Income vs Expense
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.typeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  `$${value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Category Breakdown
        </h2>
        {analyticsData.categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#14b8a6" />
              <Bar dataKey="expense" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No transaction data available
          </p>
        )}
      </div>
    </Layout>
  );
}
