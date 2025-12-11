// src/components/Login.jsx
import React, { useState } from "react";
import { Mail, Lock, TrendingUp, AlertCircle } from "lucide-react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Email/Password Sign In
  const handleEmailSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user info in localStorage
      localStorage.setItem("authToken", user.accessToken);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "User",
        })
      );

      // Replace the login page from browser history so back button doesn't return to it
      window.history.replaceState({ path: "/" }, "", "/");

      // Redirect to dashboard
      window.location.href = "/";
    } catch (error) {
      console.error("Sign in error:", error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  // Handle Email/Password Sign Up
  const handleEmailSignUp = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user info in localStorage
      localStorage.setItem("authToken", user.accessToken);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "User",
        })
      );

      // Replace the login page from browser history so back button doesn't return to it
      window.history.replaceState({ path: "/" }, "", "/");

      // Redirect to dashboard
      window.location.href = "/";
    } catch (error) {
      console.error("Sign up error:", error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user info in localStorage
      localStorage.setItem("authToken", user.accessToken);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "User",
          photoURL: user.photoURL,
        })
      );

      // Replace the login page from browser history so back button doesn't return to it
      window.history.replaceState({ path: "/" }, "", "/");

      // Redirect to dashboard
      window.location.href = "/";
    } catch (error) {
      console.error("Google sign in error:", error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (isSignIn) {
      handleEmailSignIn();
    } else {
      handleEmailSignUp();
    }
  };

  // Convert Firebase error codes to user-friendly messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-disabled":
        return "This account has been disabled";
      case "auth/user-not-found":
        return "No account found with this email";
      case "auth/wrong-password":
        return "Incorrect password";
      case "auth/email-already-in-use":
        return "Email already in use";
      case "auth/weak-password":
        return "Password should be at least 6 characters";
      case "auth/popup-closed-by-user":
        return "Sign in cancelled";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8">
            <TrendingUp className="w-10 h-10 text-emerald-600" />
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Your Money
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Track expenses, visualize spending patterns, and take control of
            your finances with our intuitive personal finance tracker.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              Real-time expense tracking
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              Smart analytics & insights
            </li>
            <li className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              Export & backup your data
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setIsSignIn(true);
                setError("");
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                isSignIn
                  ? "bg-white shadow-md text-gray-900"
                  : "bg-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignIn(false);
                setError("");
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                !isSignIn
                  ? "bg-white shadow-md text-gray-900"
                  : "bg-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  disabled={loading}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : isSignIn ? "Sign In" : "Create Account"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
          </div>

          {isSignIn && (
            <p className="mt-6 text-center text-sm text-gray-600">
              Forgot your password?{" "}
              <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                Reset it
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
