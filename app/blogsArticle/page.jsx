"use client";

import React, { useEffect, useState, useCallback } from "react";
import SingleBlogArticle from "@/components/SingleBlogArticle/SingleBlogArticle";
import { debounce } from "@/helpers/debounce";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setLoading] = useState(false);
  const [category,setCategory] = useState("");
  const [categories,setCategories] = useState([]);
  const [categoryLoading,setCategoryLoading] = useState(false);

  const fetchBlogs = async (page, pageSize, searchTerm, limit,cat) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/blogs/pagination?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&limit=${limit}&category=${cat}&sortBy=createdAt&sortOrder=desc`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      setLoading(false);
     if(data?.data) setBlogs(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Use debounce to handle search input changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchBlogs = useCallback(
    debounce((page, pageSize, searchTerm, limit, cat) => {
      fetchBlogs(page, pageSize, searchTerm, limit, cat);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchBlogs(page, pageSize, searchTerm, limit, category);
  }, [page, pageSize, searchTerm, limit, debouncedFetchBlogs, category]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);
        const res = await fetch(`/api/category/sub-category`);
        const data = await res.json();
        setCategoryLoading(false);
        setCategories(data);
      } catch (error) {
        setCategoryLoading(false);
        console.error(error);
      }
    };
    fetchCategories();
  }, []);


const handleCategoryEvent = async(_category)=>{
  try {
    const res = await fetch(`/api/blogs/category-blogs?catId=${_category?.uid}&category=${_category?.name}`);
    const data = await res.json();
    setBlogs(data?.data);
  } catch (error) {
    console.error(error);
  }
}

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
      <div>
        {
          categoryLoading ? <div className="flex flex-grow gap-2">
            { [...new Array(10)].map((_, index) => (
              <div
                key={index}
              className={`animate-pulse w-full h-[20px]  border-l-[14px] opacity-0  p-2 bg-zinc-400 rounded shadow-sm`}
            >
            </div>
            ))}
          </div> : <div className="flex flex-wrap gap-2">
            {categories?.map((_category, _index) => (
              <button
                onClick={() => handleCategoryEvent(_category)}
                key={_index}
                className="border border-gray-300 text-xs p-2 rounded hover:bg-slate-200/30 hover:border-gray-700"
               >
               {_category?.name}
              </button>
            ))}
          </div>
        }
      </div>
      <div className="p-5 min-h-[60vh]">
       {
        loading ? <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
         { [...new Array(10)].map((_, index) => (
            <div
              key={index}
            className={`animate-pulse w-full h-[200px] border-l-[14px] opacity-0  p-2 bg-zinc-400 rounded shadow-sm`}
          >
            
          </div>
          ))}
        </div > :  blogs?.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
        {blogs?.map((blog, _index) => (
          <SingleBlogArticle key={_index} blog={blog} />
        ))}
      </div> : 
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-center">No blogs found</h1>
      </div>
       }
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
