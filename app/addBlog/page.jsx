"use client";
// import AuthContext from "@/context/AuthContext";
import { categoriesData } from "./categoryData";
import React, { useState } from "react";
import axios from "axios";
import MarkdownPreview from "./MarkdownPreview";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";

const AddarticlesForm = () => {
  const { status } = useSession();
  const { toast } = useToast();
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
  const [sortContent, setSortContent] = useState("");

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
    const unAuth = status === "authenticated";
    if (!unAuth) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You are not logIn ,Please login first",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    const info = {
      articleTitle,
      articleCategory: category,
      details: {
        user,
        image: photo,
        details,
      },
      sortContent,
    };
    try {
      setloading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...info }),
      };
      const res = await fetch(`/api/blogs`, requestOptions);

      if (res.status == 200) {
        toast({
          title: "Blog Added Successfull",
        });
        form.reset();
        setloading(false);
      }
    } catch (error) {
      toast({
        title: `${error.message}`,
      });
    }
  };
  // console.log();
  return (
    <div className="max-w-screen-xl mx-auto px-2 py-5 min-h-screen">
      <h4 className="text-gray-900 font-semibold text-2xl ">Create a Blog</h4>
      <div className=" my-10 ">
        {/* {loading && <h4 className="mb-4 px-4">Loading.....</h4>} */}
        <form
          action=""
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-2 flex flex-col gap-2"
        >
          {/* blog title section  */}
          <div className="">
            <div className="">
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
          </div>
          {/* blog category section  */}
          <div className="">
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
          </div>
          {/* image uploader section  */}
          <div>
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
          </div>
          <div>
            <Textarea
              onChange={(e) => setSortContent(e.target.value)}
              value={sortContent}
              // className="inpt"
              placeholder="sort content"
              type="text"
              name="details"
              maxLength={200}
            />
          </div>
          {/* blog main content  */}
          <div className="">
            <Textarea
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              // className="inpt"
              placeholder="Details markdown syntax only"
              type="text"
              name="details"
            />
          </div>

          <div className="mt-4 ml-2">
            <button className="w-fit btn" type="submit">
              <span>Add Blog</span>
            </button>
          </div>
        </form>

        <div>
          {/* preview  */}
          <h4>{articleTitle}</h4>
          <h4>{category}</h4>
          {photo && (
            <Image alt="photo for blog" width={300} height={300} src={photo} />
          )}
          <h4>{sortContent}</h4>
          <MarkdownPreview details={details}></MarkdownPreview>
        </div>
      </div>

      {/* blog looking sample  */}
    </div>
  );
};

export default AddarticlesForm;
