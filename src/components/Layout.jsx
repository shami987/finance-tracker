import React, { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import Sidebar from "./Sidebar";

export default function Layout({ children, pageTitle }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Top Bar - Page Title + User Profile */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>

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

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
