import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; 

const SlidingButton = () => {
  const [enabled, setEnabled] = useState(false);

  const handleClick = () => {
    alert("Something went wrong when trying dark mode");
    setEnabled(!enabled);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-16 h-9 flex items-center rounded-full px-1 cursor-pointer transition-colors duration-300
        ${enabled ? "bg-gray-700" : "bg-white"}`}
    >
      <div
        className={`w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300
          ${enabled ? "translate-x-7" : "translate-x-0"}`}
      >
        {enabled ? (
          <FaMoon className="text-gray-700 text-sm" />
        ) : (
          <FaSun className="text-yellow-500 text-sm" />
        )}
      </div>
    </div>
  );
};

export default SlidingButton;
