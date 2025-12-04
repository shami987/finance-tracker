import React, { useState, useEffect } from "react";
import { User, Settings, AlertTriangle, Lock, Bell } from "lucide-react";
import Layout from "./Layout";
import ChangePasswordModal from "./ChangePasswordModal";

export default function SettingsPage() {
  const [userData, setUserData] = useState({ displayName: "", email: "" });
  const [activeTab, setActiveTab] = useState("profile");
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      setUserData(JSON.parse(user));
    } else {
      // default placeholder
      setUserData({ displayName: "John Doe", email: "john@example.com" });
    }
  }, []);

  const handleChange = (key, value) => {
    const next = { ...userData, [key]: value };
    setUserData(next);
    localStorage.setItem("userData", JSON.stringify(next));
  };

  // preferences state
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("userCurrency") || "USD";
  });
  const [emailNotifications, setEmailNotifications] = useState(() => {
    const v = localStorage.getItem("emailNotifications");
    return v ? JSON.parse(v) : true;
  });

  useEffect(() => {
    localStorage.setItem("userCurrency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem(
      "emailNotifications",
      JSON.stringify(emailNotifications)
    );
  }, [emailNotifications]);

  return (
    <Layout pageTitle="Settings">
      <div className="space-y-6">
        {/* Tabs + profile summary row */}
        <div className="flex items-start justify-between gap-6">
          <div className="bg-white rounded-full p-1 shadow-sm">
            <div className="flex items-center bg-gray-50 rounded-full overflow-hidden">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "profile"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-500"
                }`}
              >
                <User size={16} />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("preferences")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "preferences"
                    ? "bg-gray-50 text-gray-700"
                    : "text-gray-500"
                }`}
              >
                <Settings size={16} />
                Preferences
              </button>
              <button
                onClick={() => setActiveTab("account")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "account"
                    ? "bg-gray-50 text-gray-700"
                    : "text-gray-500"
                }`}
              >
                <AlertTriangle size={16} />
                Account
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {userData.displayName}
              </div>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User size={18} className="text-gray-600" />
            </div>
          </div>
        </div>

        {/* Tab panels */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Profile Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userData.displayName}
                  onChange={(e) => handleChange("displayName", e.target.value)}
                  className="w-full bg-gray-50 rounded-full px-4 py-3 border border-transparent focus:border-gray-300 focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full bg-gray-50 rounded-full px-4 py-3 border border-transparent focus:border-gray-300 focus:ring-0"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Password
                </div>
                <div className="text-xs text-gray-500">
                  Change your password
                </div>
              </div>

              <button
                onClick={() => setShowChangePassword(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
              >
                <Lock size={16} />
                <span className="text-sm font-medium text-gray-700">
                  Change Password
                </span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              App Preferences
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-white rounded-full px-4 py-3 border border-gray-100"
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                </select>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-gray-600">
                    <Bell />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Email Notifications
                    </div>
                    <div className="text-xs text-gray-500">
                      Get notified about transactions
                    </div>
                  </div>
                </div>

                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-emerald-500 transition-colors"></div>
                    <div
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition ${
                        emailNotifications ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "account" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Account
            </h3>

            <div className="mt-4 p-6 rounded-xl bg-red-50 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-red-700">
                    Danger Zone
                  </h4>
                  <div className="mt-3 text-sm text-red-600">
                    <div className="font-medium">Delete Account</div>
                    <div className="text-xs text-red-500">
                      This action cannot be undone
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      const ok = window.confirm(
                        "Are you sure you want to delete your account? This action cannot be undone."
                      );
                      if (ok) {
                        console.log("Delete account requested");
                        // actual account deletion requires reauthentication and calling auth.currentUser.delete()
                      }
                    }}
                    className="inline-flex items-center px-5 py-3 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChangePasswordModal
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        onUpdate={(newPass) => {
          console.log("update password", newPass);
        }}
      />
    </Layout>
  );
}
