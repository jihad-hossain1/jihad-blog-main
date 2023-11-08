"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UpdateBlogForm = ({ id, blog }) => {
  //   console.log(blog);
  const router = useRouter();

  const { articleTitle, details, image } = blog;

  console.log(details);
  const [newArticleTitle, setnewarticletitle] = useState(articleTitle);
  const [newDetails, setnewdetails] = useState(details);
  const [newImage, setnewimage] = useState(image);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const upInfo = {
      newArticleTitle,
      newDetails,
      newImage,
    };
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(upInfo),
      });

      if (!res.ok) {
        throw new Error("Failed to update project");
      }
      router.push("/dashboard/manageBlog");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-7">
          <input
            onChange={(e) => setnewarticletitle(e.target.value)}
            value={newArticleTitle}
            className="w-full border border-gray-200 p-3 focus:outline-none"
            placeholder="Title"
            type="text"
            name="title"
          />
        </div>
        <div className="mb-6 flex space-x-3 items-center">
          <textarea
            onChange={(e) => setnewdetails(e.target.value)}
            value={newDetails?.detailsSingle}
            className="w-full border border-gray-200 p-3 focus:outline-none"
            placeholder="details"
            type="text"
            name="gitlink"
          />
          <input
            onChange={(e) => setnewimage(e.target.value)}
            value={newImage}
            className="w-full border border-gray-200 p-3 focus:outline-none"
            placeholder="live-link"
            type="text"
            name="livelink"
          />
        </div>
        <button
          type="submit"
          className="transition duration-300 border p-4 w-fit bg-yellow-400 text-white rounded hover:bg-yellow-500"
        >
          update blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlogForm;
