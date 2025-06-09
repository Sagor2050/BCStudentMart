import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; 

const WhyChooseSection = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="bg-[#f6def8]">
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 py-12 mx-auto max-w-7xl 
  bg-white/20 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 overflow-hidden z-10">

        {/* Blurred blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl opacity-30 z-0"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl opacity-30 z-0"></div>
        {/* Content Wrapper */}
        <div className="relative z-10 w-full md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8A1538]">
            Why Choose BCStudentMart?
          </h2>
          <p className="text-gray-800 text-base md:text-lg">
            BCStudentMart is your trusted marketplace for textbooks, electronics, and
            dorm essentials—built by and for Brooklyn College students.
          </p>

          {!isLoggedIn && (
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#8A1538] text-white py-2 px-6 rounded-lg hover:bg-[#6d0f2e] transition"
            >
              Sign Up With Your School Credentials
            </button>
          )}

          <p className="text-sm text-gray-600 italic">
            *No need to create another account!
          </p>
        </div>

        {/* Image Section */}
        <div className="relative z-10 w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <div className="rounded-full overflow-hidden w-64 h-64 shadow-2xl border-[10px] border-white">

            <img
              src="./cover.png"
              alt="Students"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseSection;
