import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import Sidebar from './Sidebar';

// Sample data for the balance trend
const balanceData = [
  { date: 'Jan 1', balance: 2300 },
  { date: 'Jan 3', balance: 2250 },
  { date: 'Jan 5', balance: 2200 },
  { date: 'Jan 7', balance: 2400 },
  { date: 'Jan 10', balance: 2929 },
  { date: 'Jan 12', balance: 2700 },
  { date: 'Jan 15', balance: 2200 },
  { date: 'Jan 17', balance: 2150 },
  { date: 'Jan 20', balance: 2250 },
  { date: 'Jan 22', balance: 2300 },
  { date: 'Jan 25', balance: 2400 },
  { date: 'Jan 27', balance: 2500 },
  { date: 'Today', balance: 2300 },
];

const MainDashboard = () => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-700">{payload[0].payload.date}</p>
          <p className="text-sm font-semibold text-teal-600">
            balance: ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
     {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Total Balance */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Balance</p>
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-teal-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">$8,234.56</p>
        </div>

        {/* This Month Income */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">This Month Income</p>
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-teal-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">$6,200.00</p>
        </div>

        {/* This Month Expense */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">This Month Expense</p>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">$1,250.50</p>
        </div>
      </div>

      {/* Balance Trend Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Balance Trend</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceData}>
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
                domain={[0, 3000]}
                ticks={[0, 750, 1500, 2250, 3000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#14b8a6" 
                strokeWidth={2}
                dot={{ fill: '#14b8a6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
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