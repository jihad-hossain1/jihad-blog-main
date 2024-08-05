"use client";

import React, { useEffect, useState, useCallback } from "react";
import SingleBlogArticle from "@/components/SingleBlogArticle/SingleBlogArticle";
import { debounce } from "@/helpers/debounce";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  console.log("🚀 ~ BlogPage ~ blogs:", blogs)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBlogs = async (page, pageSize, searchTerm, limit) => {
    const res = await fetch(
      `/api/blogs/pagination?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&limit=${limit}&sortBy=createdAt&sortOrder=desc`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    setBlogs(data?.data);
  };

  // Use debounce to handle search input changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchBlogs = useCallback(
    debounce((page, pageSize, searchTerm, limit) => {
      fetchBlogs(page, pageSize, searchTerm, limit);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchBlogs(page, pageSize, searchTerm, limit);
  }, [page, pageSize, searchTerm, limit, debouncedFetchBlogs]);

  return (
    <div className="max-w-screen-xl mx-auto px-2 md:px-8 pb-6 min-h-screen">
      <div className="flex justify-center p-4">
        <input
          className="max-sm:w-11/12 md:w-1/3 p-2 border border-gray-300 focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="p-5 min-h-[60vh]">
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
          {blogs?.map((blog, _index) => (
            <SingleBlogArticle key={_index} blog={blog} />
          ))}
        </div>
      </div>

      {/* Pagination controls */}
      <section className="flex justify-end">
        <div className="flex gap-2 md:flex-row flex-col">
          <select
            className="border px-10 py-2 rounded border-gray-200"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={""} disabled>
              Show Blogs
            </option>
            {[10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="border border-gray-200 py-2 rounded shadow hover:shadow-md transition-all duration-300 px-4 text-center"
          >
            Previous
          </button>
          <h4 className="border border-gray-200 py-2 rounded shadow hover:shadow-md transition-all duration-300 px-4 text-center">
            {page}
          </h4>
          <button
            disabled={blogs?.length < pageSize}
            onClick={() => setPage(page + 1)}
            className="border border-gray-200 py-2 rounded shadow hover:shadow-md transition-all duration-300 px-4 text-center"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
