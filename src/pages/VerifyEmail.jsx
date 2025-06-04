// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { applyActionCode, getAuth } from "firebase/auth";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const auth = getAuth();
    const oobCode = searchParams.get("oobCode");

    if (!oobCode) {
      setMessage("Invalid verification link.");
      return;
    }

    applyActionCode(auth, oobCode)
      .then(() => {
        setMessage("✅ Email verified successfully! You can now log in.");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => {
        console.error("Verification error:", error.message);
        setMessage("❌ This verification link is invalid or expired.");
      });
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8edf0] px-4">
      <div className="max-w-md bg-white p-6 rounded-lg shadow text-center">
        <p className="text-lg font-medium text-[#8A1538]">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
