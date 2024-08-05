"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateBlogForm = ({ id, blog }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newArticleTitle: '',
    newDetails: '',
    newImage: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          articleTitle: formData.newArticleTitle,
          details: formData.newDetails,
          image: formData.newImage
        }),
      });

     const result = await res.json();

     console.log("🚀 ~ handleSubmit ~ result:", result)

     if(result?.result){
      toast.success(result?.message);
      router.refresh();
     }

     if(result?.error){
      toast.error(result?.error);
     }
     
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if(blog){
      setFormData({
        newArticleTitle: blog?.articleTitle || "",
        newDetails: blog?.details?.details || "",
        newImage: blog?.details?.image || "",
      })
    }
  }, [blog?.articleTitle, blog?.details, blog?.image])
  return (
    <div>
      <button onClick={() => router.back()} className="my-5 btn">Back</button>
      <form onSubmit={handleSubmit}>
        <div className="mb-7">
          <input
            onChange={(e) => setnewarticletitle(e.target.value)}
            value={formData.newArticleTitle}
            className="w-full border border-gray-200 p-3 focus:outline-none"
            placeholder="Title"
            type="text"
            name="title"
          />
           <Image
            src={formData.newImage ? formData.newImage : ""}
            className="max-w-[500px] border border-gray-200 p-3 focus:outline-none"
           height={200}
            width={1000}
          />
        </div>
        <textarea
            onChange={(e) => setnewdetails(e.target.value)}
            value={formData.newDetails}
            className="w-full border border-gray-200 p-3 focus:outline-none"
            placeholder="details"
            type="text"
            name="gitlink"
            rows={formData?.newDetails?.length > 500 ? 30 : 15}
            cols="30"
          />
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
