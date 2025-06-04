import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

const MarketplacePage = () => {
  const [books, setBooks] = useState([]);
  const { user, isLoggedIn } = useAuth(); // 🔁 Use shared login state
  const navigate = useNavigate();

  // 🔐 Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // 📦 Fetch all books sorted by newest
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const q = query(collection(db, "books"), orderBy("timestamp", "desc"));
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

  const handleAddBook = () => navigate("/post-book");

  return (
    <section className="bg-[#f8edf0] min-h-screen py-10 px-4">
      <SearchBar />

      <div className="max-w-7xl mx-auto">
        {/* Top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          <h2 className="text-3xl font-bold text-[#8A1538]">Marketplace</h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={handleAddBook}
              className="bg-[#8A1538] text-white px-4 py-2 rounded hover:bg-[#70122e] w-full sm:w-auto"
            >
              + Add Item
            </button>

            {user && (
              <div className="flex items-center gap-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.displayName || "User"}`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user.displayName || user.email}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Listings */}
        {books.length === 0 ? (
          <p className="text-center text-gray-600">No books posted yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                price={`$${book.price}`}
                image={
                  book.imageURL ||
                  "https://via.placeholder.com/150x200.png?text=No+Image"
                }               
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketplacePage;
