import React from "react";
import BookCard from "./BookCard";

// ✅ Sample book data with working image URLs
const sampleBooks = [
  {
    title: "Introduction to Algorithms",
    author: "Cormen et al.",
    price: "$40",
    image: "Introduction to Algorithms.jpg",
  },
  {
    title: "Operating Systems",
    author: "Silberschatz",
    price: "$30",
    image: "Operating Systems.jpg",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    price: "$25",
    image: "Clean Code.jpg",
  },
  {
    title: "Artificial Intelligence",
    author: "Stuart Russell",
    price: "$35",
    image: "Artificial Intelligence.jpg",
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
        <p className="text-gray-600 mt-2 text-sm">
          N.B: This Section is not real It is an #Upcoming Feature
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {sampleBooks.map((book, idx) => (
          <BookCard key={idx} {...book} />
        ))}
      </div>
    </section>
  );
};

export default SampleBooksSection;
