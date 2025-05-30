import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";

const ActualBookListingsSection = () => {
  const [books, setBooks] = useState([]); // 🔄 State to hold fetched books
  const navigate = useNavigate(); // 🔗 Navigation for "View All" button

  // 📦 Fetch up to 20 latest books from Firestore when component loads
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, "books"),
          orderBy("timestamp", "desc"),
          limit(20)
        );
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
    <section className="bg-[#f8edf0] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 🧭 Section Header and View All Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#8A1538]">
            Explore Latest Listings
          </h2>
          <button
            onClick={() => navigate("/marketplace")}
            className="text-[#8A1538] font-semibold border border-[#8A1538] px-4 py-2 rounded hover:bg-[#8A1538] hover:text-white transition"
          >
            View All →
          </button>
        </div>

        {/* 💬 Show message if no books available */}
        {books.length === 0 ? (
          <p className="text-center text-gray-500">No listings available right now.</p>
        ) : (
          // 🧱 Book Cards Grid — 3 columns even on mobile, 4 on desktop
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {books.map(book => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                price={`$${book.price}`}
                image={
                  book.imageURL || "https://via.placeholder.com/150x200.png?text=No+Image"
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ActualBookListingsSection;
