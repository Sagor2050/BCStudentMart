import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const allowedDomains = [
    "@student.brooklyn.cuny.edu",
    "@bcmail.cuny.edu",
    "@smail.astate.edu",
    "@gmail.com", // for testing
  ];

  const isAllowedEmail = (email) =>
    allowedDomains.some((domain) => email.toLowerCase().endsWith(domain));

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");

    if (!isAllowedEmail(email)) {
      setMessage("Only official college email addresses are allowed.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: name,
        profilePic: "",
        bio: "",
        conversations: [],
        createdAt: new Date(),
      });

      await sendEmailVerification(user, {
        url: "https://sagor2050.github.io/BCStudentMart/verify-email",
      });

      await signOut(auth);

      setMessage("Verification email sent! Please check your inbox.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Signup error:", error.message);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-[#f8edf0] relative">
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <Link to="/">
          <img
            src="./logo.png"
            alt="BCStudentMart Logo"
            className="w-28 h-auto hover:opacity-80 transition"
          />
        </Link>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#8A1538]">Sign Up</h1>
          <p className="text-sm text-gray-600">Create your student account</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8A1538] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@bcmail.cuny.edu"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8A1538] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8A1538] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8A1538] text-white py-2 rounded-md hover:bg-[#6d0f2e] transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-xs text-center text-gray-500 italic">
            A verification email will be sent. You’ll only need to verify once.
          </p>

          <p
            onClick={() => navigate("/login")}
            className="text-sm text-center text-[#8A1538] underline cursor-pointer pt-2"
          >
            Already have an account? Log in here.
          </p>
        </form>

        {message && (
          <div className="text-center text-sm text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;

