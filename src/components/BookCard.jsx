import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  if (!book || typeof book !== "object") {
    return (
      <div className="bg-white p-4 rounded shadow text-red-500">
        ❌ Invalid book data
      </div>
    );
  }

  const handleClick = () => {
    if (book.sellerUid) {
      navigate(`/user-profile/${book.sellerUid}`);
    } else {
      alert("⚠️ This book doesn't have seller info. It may be an older post.");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-[180px] 
      mx-auto cursor-pointer hover:shadow-lg transform transition-transform duration-300
       hover:scale-105">

      <img
        src={book.imageURL || "https://via.placeholder.com/150x200.png?text=No+Image"}
        alt={book.title || "Book Cover"}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
          {book.title || "Untitled"}
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          by {book.author || "Unknown"}
        </p>
        <p className="text-[#8A1538] font-bold text-sm mt-2">
          {book.price ? `$${book.price}` : "No Price"}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
