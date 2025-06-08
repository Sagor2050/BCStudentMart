import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext'; 
import SlidingButton from './SlidingButton';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth(); 

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  // ✅ Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {/* 🔝 NAVBAR */}
      <nav className="bg-[#8A1538] drop-shadow-2xl z-50 px-6 py-5">
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
            <SlidingButton />
          </div>
        </div>
      </nav>

      {/* 📱 SIDEBAR */}
      <div
        ref={menuRef}
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
            onClick={() => {
              navigate(isLoggedIn ? '/marketplace' : '/login');
              setMenuOpen(false);
            }}
            className="px-5 py-3 text-left hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
          >
            View Marketplace
          </button>
          <button
            onClick={() => {
              navigate(isLoggedIn ? '/post-book' : '/login');
              setMenuOpen(false);
            }}
            className="px-5 py-3 text-left hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
          >
            Sell Item
          </button>
          {isLoggedIn && (
            <button
              onClick={() => {
                navigate(`/user-profile/${user.uid}`);
                setMenuOpen(false);
              }}
              className="px-5 py-3 text-left hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
            >
              Profile
            </button>
          )}
          <button
            onClick={() => {
              navigate('/messages');
              setMenuOpen(false);
            }}
            className="px-5 py-3 text-left hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
          >
            Inbox
          </button>
          <button
            onClick={() => {
              navigate('/faculty');
              setMenuOpen(false);
            }}
            className="px-5 py-3 text-left hover:bg-gray-200 text-[#7D1431] border-b border-gray-300"
          >
            Faculty
          </button>
          <button
            onClick={() => {
              navigate('/announcements');
              setMenuOpen(false);
            }}
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
