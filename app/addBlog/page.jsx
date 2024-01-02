"use client";
// import AuthContext from "@/context/AuthContext";
import { categoriesData } from "./categoryData";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import MarkdownPreview from "./MarkdownPreview";
import Image from "next/image";

const AddarticlesForm = () => {
  const [isPreview, setPreview] = useState(false);
  const user = {
    displayName: "jihad hossain",
    photoURL: "https://i.ibb.co/FnfTKzv/icon-Jihad.png",
    email: "jihadkhan934@gmail.com",
  };
  const [category, setCategory] = useState("");
  const [loading, setloading] = useState(false);

  // const [video, setVideo] = useState(null);
  // const [image, setimage] = useState(null);

  const [details, setDetails] = useState("");
  const [articleTitle, setarticleTitle] = useState("");

  const [photo, setPhoto] = useState("");
  const [image, setimage] = useState(null);

  const handleOnFileUpload = async (e) => {
    e.preventDefault();
    try {
      let data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "images_preset");
      let api = `https://api.cloudinary.com/v1_1/dqfi9zw3e/image/upload`;
      const res = await axios.post(api, data);
      let _up = await res?.data?.secure_url;
      setPhoto(_up);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const info = {
      articleTitle,
      image: photo,
      articleCategory: category,
      details,
      user,
    };
    try {
      setloading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      };
      const res = await fetch(`/api/blogs`, requestOptions);

      if (res.status == 200) {
        toast.success("blogs is added");
        form.reset();
        setloading(false);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-2 py-5 min-h-screen">
      <h4 className="text-gray-900 font-semibold text-2xl ">Create a Blog</h4>
      <div className=" my-10 ">
        {loading && <h4 className="mb-4 px-4">Loading.....</h4>}
        <form action="" onSubmit={handleSubmit}>
          {/* blog title section  */}
          <div className="grid lg:grid-cols-2 gap-3">
            <div className="mb-7">
              <input
                className="inpt"
                required
                placeholder="Title"
                type="text"
                name="articleTitle"
                value={articleTitle}
                onChange={(e) => setarticleTitle(e.target.value)}
              />
            </div>
            <h4>{articleTitle}</h4>
          </div>
          {/* blog category section  */}
          <div className="grid lg:grid-cols-2 gap-3">
            <select
              required
              onChange={(e) => setCategory(e.target.value)}
              className="mb-7 w-full inpt"
            >
              <option>Select a Category</option>

              {categoriesData.map((ite) => (
                <option key={ite.id} value={ite.value}>
                  {ite.value}
                </option>
              ))}
            </select>
            {/* preview  */}
            <h4>{category}</h4>
          </div>
          {/* image uploader section  */}
          <div className="grid lg:grid-cols-2 gap-3">
            <div className="flex items-center gap-3">
              <input
                className="inpt"
                required
                type="file"
                name=""
                accept="image/*"
                id="image"
                onChange={(e) => setimage((prev) => e.target.files[0])}
              />
              <button
                onClick={handleOnFileUpload}
                className="border p-2 rounded bg-slate-400"
              >
                Upload
              </button>
            </div>

            {photo && (
              <Image
                alt="photo for blog"
                width={300}
                height={300}
                src={photo}
              />
            )}
          </div>
          {/* blog main content  */}
          <div className="grid lg:grid-cols-2 gap-3">
            <textarea
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              className="inpt"
              placeholder="Details markdown syntax only"
              type="text"
              name="details"
            />
            <MarkdownPreview details={details}></MarkdownPreview>
          </div>

          <div>
            <button className="inpt btn" type="submit">
              {loading ? (
                <span className="text-sm">Loading...</span>
              ) : (
                <span>Add Blog</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* blog looking sample  */}
    </div>
  );
};

export default AddarticlesForm;
