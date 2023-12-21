"use client";

import React, { useEffect, useState } from "react";
import SingleBlogArticle from "../SingleBlogArticle/SingleBlogArticle";
import Pagination from "./Pagination";

const paginate = (data, page, itemsPerPage) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
};

const BlogsContent = ({ blogs }) => {
  return (
    <div>
      <div>
        <button>next</button>
      </div>
      <div className="flex flex-col gap-4">
        {blogs?.map((blog, _i) => (
          <SingleBlogArticle key={_i} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsContent;
