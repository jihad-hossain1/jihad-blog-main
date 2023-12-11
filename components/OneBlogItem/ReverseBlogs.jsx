"use client";

import { useState } from "react";
import SingleBlogArticle from "../SingleBlogArticle/SingleBlogArticle";
import Pagination from "./Pagination";

const ReverseBlogs = ({ itmesBlog }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [BlogsPerPage] = useState(6);
  // pagination

  // Get current posts
  const indexOfLastBlogs = currentPage * BlogsPerPage;
  const indexOfFirstBlogs = indexOfLastBlogs - BlogsPerPage;
  const currentBlogss = itmesBlog?.slice(indexOfFirstBlogs, indexOfLastBlogs);
  // console.log(currentBlogss);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="flex flex-col gap-4 ">
        {currentBlogss?.map((item) => (
          <SingleBlogArticle key={item?._id} blog={item} />
        ))}
      </div>
      <div>
        <Pagination
          paginate={paginate}
          BlogsPerPage={BlogsPerPage}
          totalBlogs={itmesBlog?.length}
        />
      </div>
    </>
  );
};

export default ReverseBlogs;
