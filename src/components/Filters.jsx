import React from "react";

export default function Filters({ filters, setFilters, categories, clearFilters }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h3 className="font-semibold mb-3">Filters</h3>

      <div className="grid grid-cols-12 gap-3 items-center">
        <div className="col-span-6">
          <input
            value={filters.search}
            onChange={(e) => setFilters(f => ({...f, search: e.target.value}))}
            placeholder="Search transactions..."
            className="w-full p-3 rounded-lg border"
          />
        </div>

        <div className="col-span-2">
          <select
            value={filters.type}
            onChange={(e) => setFilters(f => ({...f, type: e.target.value}))}
            className="w-full p-3 rounded-lg border"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="col-span-3">
          <select
            value={filters.category}
            onChange={(e) => setFilters(f => ({...f, category: e.target.value}))}
            className="w-full p-3 rounded-lg border"
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="col-span-1">
          <button onClick={clearFilters} className="w-full p-3 rounded-lg border">Clear</button>
        </div>
      </div>
    </div>
  );
}
