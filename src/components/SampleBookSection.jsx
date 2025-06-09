import React from "react";
import BookCard from "./BookCard";

// ✅ Sample book data with mock seller info and image URLs
const sampleBooks = [
  {
    title: "Introduction to Algorithms",
    author: "Cormen et al.",
    price: 40,
    imageURL: "./Introduction to Algorithms.jpg",
    sellerUid: "sample-user-1",
  },
  {
    title: "Operating Systems",
    author: "Silberschatz",
    price: 30,
    imageURL: "./Operating Systems.jpg",
    sellerUid: "sample-user-2",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 25,
    imageURL: "./Clean Code.jpg",
    sellerUid: "sample-user-3",
  },
  {
    title: "Artificial Intelligence",
    author: "Stuart Russell",
    price: 35,
    imageURL: "./Artificial Intelligence.jpg",
    sellerUid: "sample-user-4",
  },
];

const SampleBooksSection = () => {
  return (
    <section className="bg-[#f6def8] py-16 px-4">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8A1538]">
          Explore Popular Listings
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          Find books that students are sharing, selling, or donating.
        </p>
        <p className="text-gray-600 mt-2 text-sm italic">
          N.B: This Section is not real — It is an <strong>#Upcoming Feature</strong>
        </p>
      </div>

      {/* Glossy Container */}
      <div className="relative max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 px-4 sm:px-6 py-8 overflow-hidden z-10">
        {/* Blurred blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl opacity-30 z-0"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl opacity-30 z-0"></div>

        {/* Book Cards Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sampleBooks.map((book, idx) => (
            <BookCard key={idx} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SampleBooksSection;
