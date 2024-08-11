"use client";

import ModalHeadless from "@/components/Modal/ModalHeadless";
import { debounce } from "@/helpers/debounce";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";

const SearchForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [blogs, setBlogs] = React.useState([]);
  const downref = React.useRef();
  const [searchTerm, setSearchTerm] = React.useState("");

  const router = useRouter();

  // Debounced fetch function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchBlog = React.useCallback(
    debounce(async (term) => {
      if (term) {
        const res = await fetch(`/api/blogs/blog-search?searchTerm=${term}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setBlogs(data?.data);
      } else {
        setBlogs([]);
      }
    }, 300), // 300ms debounce delay
    []
  );

  React.useEffect(() => {
    debouncedFetchBlog(searchTerm);
  }, [searchTerm, debouncedFetchBlog]);

  const handleClick = (slug) => {
    router.push(`/blogsArticle/${slug}`);
    setIsOpen(false);
  };

  // click on outside to close serach result
  function handleClickOutside(e) {
    if (downref.current && !downref.current.contains(e.target)) {
      setBlogs([]);
    }
  }

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="hidden md:block relative">
        <div className="flex items-center gap-2">
          <label htmlFor="" className="">
            Search
          </label>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" border border-gray-300 rounded-md px-2 py-1 focus:outline-none "
            placeholder="What are looking for!"
          />
        </div>
        <div
          ref={downref}
          className="absolute top-12 left-0 w-full bg-white max-h-[300px] overflow-auto"
        >
          {blogs?.length > 0 && (
            <div>
              {blogs?.map((blog) => (
                <div
                  className="border border-gray-200 rounded-md p-2 cursor-pointer"
                  key={blog?._id}
                  onClick={() => handleClick(blog?.slug)}
                >
                  {blog?.articleTitle}
                </div>
              ))}
            </div>
          )}
        </div>
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
        <div>
          <label htmlFor="">serach</label>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" border border-gray-100 p-2 focus:outline-none"
            placeholder="what are looking for!"
          />
        </div>
        <div
          // ref={downref}
          className="bg-white max-h-[300px] overflow-auto"
        >
          {blogs?.length > 0 && (
            <div>
              {blogs?.map((blog) => (
                <div
                  className="border border-gray-200 rounded-md p-2 cursor-pointer"
                  key={blog?._id}
                  onClick={() => handleClick(blog?._id)}
                >
                  {blog?.articleTitle}
                </div>
              ))}
            </div>
          )}
        </div>
      </ModalHeadless>
    </div>
  );
};

export default SearchForm;
