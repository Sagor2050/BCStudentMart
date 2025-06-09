import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";
import { createOrGetConversation } from "../utils/createOrGetConversation";

const UserProfilePage = () => {
  const { userId: paramUserId } = useParams(); // userId from route
  const { user } = useAuth();                  // Logged-in user
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const viewedUserId = paramUserId || user?.uid;

  // ✅ Handle messaging
  const handleMessageSeller = async () => {
    try {
      const { id: convoId } = await createOrGetConversation(user.uid, viewedUserId);
      navigate(`/messages/${convoId}`);
    } catch (err) {
      console.error("Failed to initiate message:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // ✅ Load profile and books
  useEffect(() => {
    if (!viewedUserId) return;

    const fetchData = async () => {
      try {
        // 🔍 Get profile
        const userRef = doc(db, "users", viewedUserId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setProfile(userSnap.data());
        } else {
          setProfile(null);
        }

        // 📚 Get user's books
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
    return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10 text-red-600">❌ Profile not found.</p>;
  }

  return (
    <section className="bg-[#f6def8] min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        {/* 👤 Profile Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${profile.username}&background=8A1538&color=fff`}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#8A1538]">{profile.username}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          {/* 💬 Message button if not your own profile */}
          {user?.uid !== viewedUserId && (
            <button
              className="ml-auto px-4 py-2 bg-[#8A1538] text-white rounded hover:bg-[#6d0f2e]"
              onClick={handleMessageSeller}
            >
              Message
            </button>
          )}
        </div>

        {/* 📚 Listings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Active Listings
          </h3>

          {books.length === 0 ? (
            <p className="text-gray-500">No books posted yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;
