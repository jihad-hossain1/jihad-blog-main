"use client";
// import AuthContext from "@/context/AuthContext";
import { categoriesData } from "./categoryData";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { PiTrashLight, PiLinkLight } from "react-icons/pi";
import axios from "axios";

const AddarticlesForm = () => {
  // const { user } = useContext(AuthContext);
  const user = {
    displayName: "jihad hossain",
    photoURL: "https://i.ibb.co/FnfTKzv/icon-Jihad.png",
    email: "jihadkhan934@gmail.com",
  };
  const [category, setCategory] = useState(null);
  const [loading, setloading] = useState(false);

  const [mores, setMores] = useState([]);
  const [moreInput, setMoreInput] = useState("");

  const [links, setLinks] = useState([]);
  const [linkeInput, setLinkInput] = useState("");

  const [infos, setinfos] = useState();

  const [video, setVideo] = useState(null);
  const [image, setimage] = useState(null);

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? image : video);
    data.append(
      "upload_preset",
      type === "image" ? "images_preset" : "videos_presets"
    );

    try {
      //   let cloudName = import.meta.env.VITE_CLOUDNARY_NAME;
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/dqfi9zw3e/${resourceType}/upload`;

      const res = await axios.post(api, data);
      console.log(res);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const addLink = (e) => {
    e.preventDefault();
    if (linkeInput.trim() !== "") {
      setLinks((prev) => [...prev, linkeInput]);
      setLinkInput("");
    }
  };

  const deleteMore = (ind) => {
    setLinks((prev) => prev.filter((_, i) => i !== ind));
  };
  const addMore = (e) => {
    e.preventDefault();
    if (moreInput.trim() !== "") {
      setMores((prev) => [...prev, moreInput]);
      setLinkInput("");
    }
  };

  const deleteLink = (ind) => {
    setMores((prev) => prev.filter((_, i) => i !== ind));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const articleTitle = form.articleTitle.value;
    const author = form.author.value;
    const email = form.email.value;
    const details = form.details.value;
    const linkUrl = form.linkUrl.value;
    //link
    // single image upload
    const imgUrl = await uploadFile("image");

    //upload video file
    const videoUrl = await uploadFile("video");
    //main info for
    const info = {
      articleTitle,
      articleCategory: category,
      details: {
        detailsSingle: details,
        mores,
      },
      author,
      email,
      blog_links: { links, linkUrl },
      videoLink: videoUrl,
      image: imgUrl,
    };

    console.log(info);
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
  };

  return (
    <div className="max-w-screen-xl mx-auto px-2 py-5">
      <h4 className="text-blue-gray-900 font-semibold text-2xl ">
        Create a Blog
      </h4>
      <div className="max-w-[400px] lg:max-w-[500px] my-10 mx-auto">
        {loading && <h4 className="mb-4 px-4">Loading.....</h4>}
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-7">
            <input
              className="border  p-3 focus:outline-none w-full rounded-sm "
              variant="standard"
              required
              placeholder="Title"
              type="text"
              name="articleTitle"
            />
          </div>
          <div className="mb-7">
            <input
              className="border  p-3 focus:outline-none w-full rounded-sm "
              value={user?.displayName}
              variant="standard"
              required
              placeholder="author"
              type="text"
              name="author"
            />
          </div>
          <div className="mb-7 ">
            <div>
              {links &&
                links.map((link, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <PiLinkLight />
                    <p className="text-blue-700">{link}</p>
                    <span
                      className="cursor-pointer"
                      onClick={() => deleteMore(i)}
                    >
                      <PiTrashLight />
                    </span>
                  </div>
                ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                className="border  p-3 focus:outline-none w-full rounded-sm "
                onChange={(e) => setLinkInput(e.target.value)}
                value={linkeInput}
                variant="standard"
                placeholder="link"
                type="text"
                name="linkUrl"
              />
              <button
                onClick={addLink}
                className="rounded-full border border-blue-gray-300 hover:border-blue-gray-50 p-1 hover:bg-gray-900 transition-all duration-300"
              >
                <FaPlus className="text-blue-gray-800 hover:text-white" />
              </button>
            </div>
          </div>
          <div className="mb-7">
            <input
              className="border  p-3 focus:outline-none w-full rounded-sm "
              value={user?.email}
              variant="standard"
              required
              placeholder="email"
              type="email"
              name="email"
            />
          </div>
          <select
            required
            onChange={(e) => setCategory(e.target.value)}
            className="mb-7 w-full rounded-sm bg-transparent border-b border-blue-gray-300"
          >
            <option>Select a Category</option>

            {categoriesData.map((ite) => (
              <option key={ite.id} value={ite.value}>
                {ite.value}
              </option>
            ))}
          </select>

          <div className="mb-7 ">
            <div className="flex gap-2">
              <textarea
                onChange={(e) => setMoreInput(e.target.value)}
                value={moreInput}
                className="bg-transparent w-full min-h-[200px] focus:outline-none  p-2"
                placeholder="Details"
                type="text"
                name="details"
              />
              <div>
                <button
                  onClick={addMore}
                  className="inline-block rounded-full border border-blue-gray-300 hover:border-blue-gray-50 p-1 hover:bg-gray-900 transition-all duration-300"
                >
                  <FaPlus className="text-blue-gray-800 hover:text-white" />
                </button>
              </div>
            </div>
            <div>
              {mores &&
                mores.map((textInfo, i) => (
                  <div key={i} className="flex gap-2 items-center py-2">
                    <span
                      className="cursor-pointer"
                      onClick={() => deleteLink(i)}
                    >
                      <PiTrashLight />
                    </span>
                    <p className="text-blue-gray-500 text-xs break-all">
                      {textInfo}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="mb-4 ">
            <label htmlFor="images">Image Upload</label>
            <br />
            <input
              className=""
              required
              type="file"
              name=""
              accept="image/*"
              id="image"
              onChange={(e) => setimage((prev) => e.target.files[0])}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="video">Video Upload</label>
            <br />
            <input
              required
              className=""
              type="file"
              name=""
              accept="video/*"
              id="video"
              onChange={(e) => setVideo((prev) => e.target.files[0])}
            />
          </div>
          <div>
            <button className="w-full" type="submit" variant="standard">
              Add Blog
            </button>
          </div>
        </form>
      </div>

      {/* blog looking sample  */}
    </div>
  );
};

export default AddarticlesForm;
