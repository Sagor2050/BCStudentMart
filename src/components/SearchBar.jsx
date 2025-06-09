import React from 'react';

const SearchBar = () => {
  return (
    <div className="bg-[#f6def8] py-6 px-4">
      <div className="flex justify-center mt-10 px-4 mb-8">
        <div className="flex w-full max-w-md ">
          <input
            type="text"
            placeholder="Search All"
            className="flex-grow border border-black-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#7D1431] text-sm"
          />
          <button
            className="px-4 py-2 bg-[#7D1431] text-white rounded-r-lg hover:bg-[#5a0f24] transition text-sm"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
