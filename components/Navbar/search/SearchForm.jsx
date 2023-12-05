"use client";

import ModalHeadless from "@/components/Modal/ModalHeadless";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";

const SearchForm = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchField, setSearchField] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    console.log(searchField);
  };
  return (
    <div>
      <div className="hidden md:block">
        <form action="" onSubmit={handleForm}>
          <label htmlFor="">serach</label>
          <input
            defaultValue={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className=" border border-gray-100 p-2 focus:outline-none"
            placeholder="what are looking for!"
          />
        </form>
      </div>
      <button
        className="block md:hidden"
        onClick={() => setIsOpen((pre) => !pre)}
      >
        <PiMagnifyingGlassLight className="text-2xl" />
      </button>
      <ModalHeadless
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Search Your Query"}
      >
        <form action="" onSubmit={handleForm}>
          <label htmlFor="">serach</label>
          <input
            defaultValue={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className=" border border-gray-100 p-2 focus:outline-none"
            placeholder="what are looking for!"
          />
        </form>
      </ModalHeadless>
    </div>
  );
};

export default SearchForm;
