import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import SlidingButton from './SlidingButton';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  // Close sidebar when clicking outside (but not on the hamburger)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
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
      {/* Sticky Navbar */}
      <nav className="bg-[#8A1538] drop-shadow-2xl z-50 px-6 py-5 fixed top-0 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm font-medium text-white">
          {/* Animated Hamburger Icon */}
          <button
            ref={burgerRef}
            onClick={toggleMenu}
            className="relative w-7 h-6 flex flex-col justify-between items-center focus:outline-none"
          >
            <span
              className={`w-full h-[3px] bg-white rounded transition-transform duration-300 ease-in-out ${
                menuOpen ? 'rotate-45 translate-y-[10px]' : ''
              }`}
            ></span>
            <span
              className={`w-full h-[3px] bg-white rounded transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`w-full h-[3px] bg-white rounded transition-transform duration-300 ease-in-out ${
                menuOpen ? '-rotate-45 -translate-y-[10px]' : ''
              }`}
            ></span>
          </button>

          {/* Right Side Buttons */}
          <div className="flex gap-4 items-center">
            {!isLoggedIn && (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#8A1538] transition"
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

      {/* Sidebar */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-100 shadow-md border-r border-gray-300 transition-transform duration-300 pt-[70px] ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-300">
          <button
            onClick={() => {
              navigate('/');
              setMenuOpen(false);
            }}
            className="text-[#7D1431] font-bold text-lg"
          >
           📘 BCStudentMart
          </button>
        </div>

        {/* Menu Items */}
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

      {/* Spacer */}
      <div className="h-[70px]" />
    </>
  );
};

export default Navbar;
