import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";

const UserProfilePage = () => {
  const { userId: paramUserId } = useParams(); // userId from route if exists
  const { user } = useAuth();                  // Current logged-in user
  const [profile, setProfile] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const viewedUserId = paramUserId || user?.uid;

  // ✅ Load user profile and books
  useEffect(() => {
    if (!viewedUserId) return;

    const fetchData = async () => {
      try {
        // 🔍 Get user profile
        const userRef = doc(db, "users", viewedUserId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setProfile(userSnap.data());
        } else {
          setProfile(null);
        }

        // 📚 Get user's active book listings
        const booksRef = collection(db, "books");
        const q = query(booksRef, where("postedBy", "==", viewedUserId));
        const snapshot = await getDocs(q);
        const userBooks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(userBooks);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewedUserId]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading profile...</p>
    );
  }

  if (!profile) {
    return (
      <p className="text-center mt-10 text-red-600">❌ Profile not found.</p>
    );
  }

  return (
    <section className="bg-[#f8edf0] min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        {/* 👤 Profile Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${profile.username}&background=8A1538&color=fff`}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#8A1538]">
              {profile.username}
            </h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          {/* 💬 Message button if visiting someone else */}
          {user?.uid !== viewedUserId && (
            <button
              className="ml-auto px-4 py-2 bg-[#8A1538] text-white rounded hover:bg-[#6d0f2e]"
              onClick={() => alert("🔧 Messaging feature coming soon")}
            >
              Message
            </button>
          )}
        </div>

        {/* 📚 Book Listings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Active Listings
          </h3>

          {books.length === 0 ? (
            <p className="text-gray-500">No books posted yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  price={`$${book.price}`}
                  image={
                    book.imageURL ||
                    "https://via.placeholder.com/150x200?text=No+Image"
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;
