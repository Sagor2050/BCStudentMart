import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";

const ActualListingsSection = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const q = query(collection(db, "books"), orderBy("timestamp", "desc"), limit(20));
        const snapshot = await getDocs(q);
        const booksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="bg-[#f8edf0] py-16 px-4">
      {/* Centered Headline + Button */}
      <div className="max-w-3xl mx-auto text-center mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8A1538]">
          Explore Latest Listings
        </h2>
        <button
          onClick={() => navigate("/marketplace")}
          className="mt-4 text-[#8A1538] font-semibold border border-[#8A1538] px-5 py-2 rounded hover:bg-[#8A1538] hover:text-white transition"
        >
          View All →
        </button>
      </div>

      {/* Glossy Container */}
      <div className="relative max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 px-4 sm:px-6 py-8 overflow-hidden z-10">
        {/* Blobs */}
        <div className="absolute -top-6 -left-6 w-28 h-28 bg-yellow-300 rounded-full blur-2xl opacity-20 z-0" />
        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-red-300 rounded-full blur-2xl opacity-20 z-0" />

        {/* Book Cards Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {books.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No listings available right now.
            </p>
          ) : (
            books.map(book => <BookCard key={book.id} book={book} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default ActualListingsSection;
