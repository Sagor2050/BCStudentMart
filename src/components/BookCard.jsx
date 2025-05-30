// src/components/BookCard.jsx
import React from "react";

const BookCard = ({ title, author, price, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-[150px] hover:shadow-lg transition">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">by {author}</p>
      <p className="text-[#8A1538] font-bold mt-2">{price}</p>
    </div>
  );
};

export default BookCard;
