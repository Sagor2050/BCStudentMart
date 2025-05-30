import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext'; // 🔁 Global login state

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth(); 

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <>
      {/* 🔝 NAVBAR */}
      <nav className="bg-[#8A1538] shadow-md px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm font-medium text-gray-800">
          {/* 🍔 Hamburger */}
          <button
            onClick={toggleMenu}
            className="flex flex-col gap-[5px] p-2 hover:text-[#7D1431] focus:outline-none"
          >
            <span className="w-7 h-[3px] bg-[#f8edf0] rounded"></span>
            <span className="w-7 h-[3px] bg-[#f8edf0] rounded"></span>
            <span className="w-7 h-[3px] bg-[#f8edf0] rounded"></span>
          </button>

          {/* 🎯 Right Buttons */}
          <div className="flex gap-4 items-center">
            {!isLoggedIn && (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 border border-[#f8edf0] text-[#f8edf0] rounded-lg hover:bg-[#7D1431] hover:text-white transition"
              >
                Login
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-white text-white rounded-lg hover:bg-[#6d0f2e] transition"
              >
                Logout
              </button>
            )}
            <a
              href="#"
              className="px-4 py-2 bg-[#28d66e] text-white rounded-lg hover:bg-[#5a0f24] transition"
            >
              Donate
            </a>
          </div>
        </div>
      </nav>

      {/* 📱 SIDEBAR */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-100 shadow-md border-r border-gray-300 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 🔝 Sidebar Header */}
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <a href="/" className="text-[#7D1431] font-bold text-lg">
            📘 BCStudentMart
          </a>
          <button
            onClick={toggleMenu}
            className="text-xl font-bold text-[#7D1431] hover:text-[#5a0f24]"
          >
            ×
          </button>
        </div>

        {/* 📋 Menu Items */}
        <div className="flex flex-col">
          <button
            onClick={() => navigate(isLoggedIn ? '/marketplace' : '/login')}
            className="px-5 py-3 text-left hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
          >
            View Marketplace
          </button>
          <button
            onClick={() => navigate(isLoggedIn ? '/post-book' : '/login')}
            className="px-5 py-3 text-left hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
          >
            Sell Item
          </button>
          <button
            onClick={() => navigate('/help')}
            className="px-5 py-3 text-left hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
          >
            Help
          </button>
          <button
            onClick={() => navigate('/track')}
            className="px-5 py-3 text-left hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
          >
            Track
          </button>
          <button
            onClick={() => navigate('/faculty')}
            className="px-5 py-3 text-left hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
          >
            Faculty
          </button>
          <button
            onClick={() => navigate('/announcements')}
            className="px-5 py-3 text-left font-semibold hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
          >
            Announcements
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
