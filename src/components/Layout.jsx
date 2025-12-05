import React, { useState, useEffect } from "react";
import { LogOut, User, LogIn } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import Sidebar from "./Sidebar";
import AddTransactionModal from "./AddTransactionModal";
import { Link } from "react-router-dom";

export default function Layout({ children, pageTitle }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load user data
  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Top Navbar */}
      {/* Main layout with sidebar and page content side-by-side */}
      <div className="flex">
        {/* Sidebar stays at far left, at the top */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Right side: header at top, content below */}
        <div className="flex-1 flex flex-col">
          {/* === MOVE HEADER HERE === */}
          <header className="bg-white border-b">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-16 md:grid md:grid-cols-2 md:items-center">
                {/* left: menu button (mobile) + page title aligned near sidebar */}
                <div className="flex items-center w-full">
                  <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 rounded-md text-gray-700 md:hidden"
                    aria-label="Open menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>

                  {/* Mobile-only app title next to menu button */}
                  <div className="ml-3 text-base font-semibold text-green-600 md:hidden whitespace-nowrap">
                    Finance Tracker
                  </div>

                  {/* Page title for md+ placed to the left so it sits near the sidebar */}
                  {pageTitle ? (
                    <div className="hidden md:block ml-6 text-lg font-semibold text-gray-900">
                      {pageTitle}
                    </div>
                  ) : null}
                </div>

                {/* right: user/login */}
                <div className="flex items-center justify-end gap-4">
                  {userData ? (
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown((s) => !s)}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50"
                      >
                        {/* name/email only visible on md+ */}
                        <div className="hidden md:block text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {userData.displayName || "User"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {userData.email || ""}
                          </div>
                        </div>
                        {userData.photoURL ? (
                          <img
                            src={userData.photoURL}
                            alt="user"
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User size={16} className="text-gray-600" />
                          </div>
                        )}
                      </button>
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
                  ) : (
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50"
                    >
                      <LogIn />
                      <span className="hidden md:inline text-sm">Login</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>

      {/* Mobile floating Add button */}
      <div className="fixed bottom-6 right-4 md:hidden z-50">
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-3 rounded-full shadow-lg"
          aria-label="Add transaction"
        >
          <span className="text-xl font-bold">+</span>
          <span className="hidden sm:inline">Add Transaction</span>
        </button>
      </div>

      <AddTransactionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(tx) => {
          // Dispatch a window event so other parts of the app can listen and handle persistence
          window.dispatchEvent(
            new CustomEvent("add-transaction", { detail: tx })
          );
          console.log("New transaction:", tx);
        }}
      />
    </div>
  );
}
