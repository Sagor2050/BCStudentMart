import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // 🔐 Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Email verification check
      if (!user.emailVerified) {
        await signOut(auth);
        setMessage("Please verify your email before logging in.");
        return;
      }

      navigate("/marketplace");
    } catch (error) {
      setMessage(error.message);
    }
  };

  // 🔄 Handle forgot password
  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Please enter your email to reset the password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your inbox.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-[#f8f0f2] relative">
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <Link to="/">
          <img
            src="/logo.png"
            alt="BCStudentMart Logo"
            className="w-28 h-auto hover:opacity-80 transition"
          />
        </Link>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#8A1538]">Log In</h1>
          <p className="text-sm text-gray-600">Use your school email to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="yourname@bcmail.cuny.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8A1538] outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8A1538] outline-none"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[#8A1538] underline hover:text-[#6d0f2e] transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#8A1538] text-white py-2 rounded-md hover:bg-[#6d0f2e] transition"
          >
            Log In
          </button>

          {/* Signup Redirect */}
          <p
            onClick={() => navigate("/signup")}
            className="text-sm text-center text-[#8A1538] underline cursor-pointer"
          >
            Don't have an account? Sign up
          </p>
        </form>

        {/* Feedback Message */}
        {message && (
          <div className="text-center text-sm text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
