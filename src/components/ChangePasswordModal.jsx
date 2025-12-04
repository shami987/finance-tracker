import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase/config";

export default function ChangePasswordModal({ open, onClose, onUpdate }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open) return null;

  const valid = current && newPass.length >= 8 && newPass === confirmPass;

  const handleUpdate = async () => {
    if (!valid) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      // Reauthenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, current);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPass);

      setSuccess("Password updated successfully!");
      setTimeout(() => {
        // Reset form and close
        setCurrent("");
        setNewPass("");
        setConfirmPass("");
        setSuccess("");
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Password update error:", err);
      if (err.code === "auth/wrong-password") {
        setError("Current password is incorrect");
      } else if (err.code === "auth/weak-password") {
        setError("New password is too weak");
      } else {
        setError(err.message || "Failed to update password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-10">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Change Password
            </h3>
            <p className="text-sm text-gray-500">
              Enter your current password and choose a new password
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-transparent focus:border-gray-200"
                placeholder="Enter current password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label="toggle current password visibility"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-transparent focus:border-gray-200"
                placeholder="At least 8 characters"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label="toggle new password visibility"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              At least 8 characters required
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-transparent focus:border-gray-200"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label="toggle confirm password visibility"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
              {success}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-5 py-3 rounded-xl bg-white border border-gray-200 text-sm font-medium disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={!valid || loading}
            className={`flex-1 px-5 py-3 rounded-xl text-sm font-medium text-white ${
              valid && !loading
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-emerald-200 cursor-not-allowed"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
