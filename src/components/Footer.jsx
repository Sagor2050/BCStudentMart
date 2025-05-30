import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brooklyn College Info */}
        <div>
          <h2 className="text-lg font-bold mb-2">Brooklyn College</h2>
          <p className="text-sm leading-6">
            2900 Bedford Avenue<br />
            Brooklyn, NY 11210<br />
            718.951.5000
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">📘 BCStudentMart</h2>
          <p className="text-sm max-w-xs text-gray-300">
            A Brooklyn College marketplace built by students, for students. Buy, sell, or donate books and essentials easily.
          </p>
        </div>

        {/* Info For */}
        <div>
          <h3 className="font-semibold mb-3">Info For</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Prospective Students</li>
            <li>Current Students</li>
            <li>Alumni and Friends</li>
            <li>Faculty</li>
            <li>Employers</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="https://directory.cuny.edu" target="_blank" rel="noopener noreferrer">Directory</a></li>
            <li><a href="https://www.cuny.edu" target="_blank" rel="noopener noreferrer">CUNY</a></li>
            <li><a href="https://home.cunyfirst.cuny.edu" target="_blank" rel="noopener noreferrer">CUNYfirst</a></li>
            <li><a href="https://portal.brooklyn.edu" target="_blank" rel="noopener noreferrer">BC WebCentral</a></li>
            <li><a href="https://www.brooklyncollegeathletics.com" target="_blank" rel="noopener noreferrer">Athletics</a></li>
            <li><a href="https://students.brooklyn.cuny.edu" target="_blank" rel="noopener noreferrer">BC Knowledge for Students</a></li>
          </ul>
        </div>

        {/* Collaborate + Social */}
        <div>
          <h3 className="font-semibold mb-3">Collaborate</h3>
          <p className="text-sm text-gray-300 mb-2">
            Email: <a href="mailto:sagorsd975@gmail.com" className="underline">sagorsd975@gmail.com</a>
          </p>
          <div className="flex gap-4 text-xl">
            <a href="https://github.com/Sagor2050" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaGithub />
            </a>
            <a href="www.linkedin.com/in/sdsagor" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/share/154CxKFXqw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} BCStudentMart. Built with ❤️ by SD.
      </div>
    </footer>
  );
};

export default Footer;
