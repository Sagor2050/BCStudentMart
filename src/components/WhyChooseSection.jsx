import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; 

const WhyChooseSection = () => {
    const navigate = useNavigate();


    const { user, isLoggedIn } = useAuth();

  return (
    <div className="bg-[#f8edf0]">
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 py-10 bg-[#f8edf0] max-w-7xl mx-auto">
      {/* Left Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#8A1538]">
          Why Choose BCStudentMart?
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          BCStudentMart is your trusted campus marketplace to buy, sell, or
          donate items like textbooks, electronics, and dorm essentials—all in
          one place. Built by and for Brooklyn College students.
        </p>

        {!isLoggedIn && <button onClick={() => navigate("/signup")}
         className="bg-[#8A1538] text-white py-2 px-6 rounded-md hover:bg-[#6d0f2e] transition">
          Sign Up With Your School Credentials
        </button>}

        <p className="text-sm text-gray-600 italic">
          *No need to create another account!
        </p>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <div className="rounded-full bg-[#ebd3da] overflow-hidden w-64 h-64 shadow-md">
          <img
            src="/cover.jpg"
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
