"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (e) => {
    e.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);

    console.log("current query", encodedSearchQuery);
  };

  return (
    <div className="relative ">
      <button className="absolute right-0 m-2">
        <PiMagnifyingGlassLight className="text-2xl" />
      </button>
      <form action="" onSubmit={onSearch}>
        <input
          className="border border-gray-100 p-2 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="what are looking for!"
        />
      </form>
    </div>
  );
};

export default Search;
