import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Grid2X2, Send, Tag, BarChart3, Settings, Menu, X } from "lucide-react";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const NavItem = ({ to, Icon, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-full font-medium transition-all text-sm ${
          isActive
            ? "bg-green-500 text-white shadow hover:bg-green-600"
            : "text-gray-700 hover:bg-gray-50"
        }`
      }
    >
      <Icon size={20} className="text-current" />
      <span className="ml-2">{children}</span>
    </NavLink>
  );

  return (
    <>
      {/* Mobile menu slide-over (controlled by parent) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-2xl font-bold text-green-600">Finance</div>
                <div className="text-sm text-gray-400">Personal Tracker</div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-600"
              >
                <X />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-gray-700">
              <NavItem to="/" Icon={Grid2X2}>
                Dashboard
              </NavItem>
              <NavItem to="/transactions" Icon={Send}>
                Transactions
              </NavItem>
              <NavItem to="/categories" Icon={Tag}>
                Categories
              </NavItem>
              <NavItem to="/analytics" Icon={BarChart3}>
                Analytics
              </NavItem>
              <NavItem to="/settings" Icon={Settings}>
                Settings
              </NavItem>
            </nav>

            <div className="mt-8">
              <button className="w-full text-left px-4 py-3 rounded-lg border">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-72 h-screen bg-white border-r px-6 pt-6 pb-6 flex-col">
        <div className="mb-8">
          <div className="text-2xl font-bold text-green-600">Finance</div>
          <div className="text-sm text-gray-400">Personal Tracker</div>
        </div>

        <nav className="flex flex-col gap-6 text-gray-700">
          <NavItem to="/" Icon={Grid2X2}>
            Dashboard
          </NavItem>
          <NavItem to="/transactions" Icon={Send}>
            Transactions
          </NavItem>
          <NavItem to="/categories" Icon={Tag}>
            Categories
          </NavItem>
          <NavItem to="/analytics" Icon={BarChart3}>
            Analytics
          </NavItem>
          <NavItem to="/settings" Icon={Settings}>
            Settings
          </NavItem>
        </nav>

        <div className="mt-auto">

        </div>
      </aside>
    </>
  );
}
