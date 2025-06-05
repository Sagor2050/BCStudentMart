import React from "react";
import BookCard from "./BookCard";

// ✅ Sample book data with mock seller info and image URLs
const sampleBooks = [
  {
    title: "Introduction to Algorithms",
    author: "Cormen et al.",
    price: 40,
    imageURL: "/Introduction to Algorithms.jpg",
    sellerUid: "sample-user-1",
  },
  {
    title: "Operating Systems",
    author: "Silberschatz",
    price: 30,
    imageURL: "/Operating Systems.jpg",
    sellerUid: "sample-user-2",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 25,
    imageURL: "/Clean Code.jpg",
    sellerUid: "sample-user-3",
  },
  {
    title: "Artificial Intelligence",
    author: "Stuart Russell",
    price: 35,
    imageURL: "/Artificial Intelligence.jpg",
    sellerUid: "sample-user-4",
  },
];


const SampleBooksSection = () => {
  return (
    <section className="bg-[#f8edf0] py-12 px-4">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-[#8A1538]">
          Explore Popular Listings
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          Find books that students are sharing, selling, or donating.
        </p>
        <p className="text-gray-600 mt-2 text-sm italic">
          N.B: This Section is not real — It is an <strong>#Upcoming Feature</strong>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {sampleBooks.map((book, idx) => (
          <BookCard key={idx} book={book} />
        ))}
      </div>
    </section>
  );
};

export default SampleBooksSection;

