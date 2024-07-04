"use client";

import React from "react";

const MyBlogs = ({ blogs }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-10 text-center">My Blogs</h1>
      <h4> Total Blogs: {blogs?.length} </h4>
      <div className="flex flex-col gap-4">
        {blogs?.map((blog) => (
          <div key={blog?._id} className="bg-gray-200 rounded p-3">
            <p className="font-bold w-fit bg-green-200 px-3">
              {blog?.author?.name}
            </p>
            <h3 className="text-xl font-bold">{blog?.articleTitle}</h3>
            <p className="text-sm">{blog?.sortContent}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
