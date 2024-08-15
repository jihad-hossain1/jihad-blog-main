"use client";

import React, { useState } from "react";
import axios from "axios";
import MarkdownPreview from "./MarkdownPreview";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";
import { revalidate } from "@/helpers/revalidate";
import { serverAction } from "./server-action";

const AddarticlesForm = () => {
  const { status } = useSession();
  const { data: session } = useSession();

  const { toast } = useToast();
  const [isPreview, setPreview] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const [category, setCategory] = useState("");
  const [loading, setloading] = useState(false);

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
      console.error(error);
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

    try {
      setloading(true);

      const res = await serverAction({
        articleTitle: articleTitle.trim(),
        articleCategory: category,
        author: {
          name: session?.user?.name,
          userId: session?.user?.id,
        },
        details: {
          user: {
            displayName: session?.user.name,
            photoURL: session?.user.photoURL,
            email: session?.user.email,
          },
          image: photo,
          details,
        },
        sortContent: sortContent.trim(),
      });


      if (res?.error) {
        setloading(false);
        return toast({
          variant: "destructive",
          Power2: "Power",
          title: "Uh oh! Something went wrong.",
          description: res?.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (res?.result) {
        revalidate("blog");
        toast({
          title: res?.message,
        });
        setloading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const fetchSubData = React.useCallback(async () => {
    try {
        const data = await fetch("/api/category/sub-category");
        const json = await data.json();
        setCategoryData(json);
    } catch (error) {
        console.error(error);
    }
}, []);

React.useEffect(() => {
  fetchSubData();
}, [fetchSubData]);


  return (
    <div className="max-w-screen-xl mx-auto px-2 py-5 min-h-screen">
      <h4 className="text-gray-900 font-semibold text-2xl text-center">
        Create a Blog
      </h4>
      <div className="flex justify-end">
        <button
          className="border  px-3 rounded shadow-sm hover:shadow hover:bg-blue-50"
          onClick={() => setPreview(!isPreview)}
        >
          Preview
        </button>
      </div>
      <div
        className={
          isPreview ? "flex flex-col lg:grid lg:grid-cols-2 gap-4" : ""
        }
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className=" p-2 flex flex-col gap-2"
        >
          {/* blog title section  */}
          <div className="">
            <div className="">
              <label className="text-gray-900 font-semibold">Title</label>
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
              // required
              onChange={(e) => setCategory(e.target.value)}
              className="mb-7 w-full inpt"
            >
              <option>Select a Category</option>

              {categoryData?.map((ite) => (
                <option key={ite._id} value={ite.name}>
                  {ite.name}
                </option>
              ))}
            </select>
          </div>
          {/* image uploader section  */}
          <div>
            <div className="flex items-center gap-3">
              <input
                className="inpt"
                // required
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
              className="hover:outline-none"
              placeholder="Details markdown syntax support"
              type="text"
              name="details"
              cols="30"
              rows="10"
            />
          </div>

          <div className="mt-4 ml-2">
            <button disabled={loading} className="w-fit btn" type="submit">
              Add Blog
            </button>
          </div>
        </form>

        {/* preview  */}
        {isPreview && (
          <div>
            <h4>{articleTitle}</h4>
            <h4>{category}</h4>
            {photo && (
              <Image
                alt="photo for blog"
                width={300}
                height={300}
                src={photo}
              />
            )}
            <h4>{sortContent}</h4>
            <MarkdownPreview details={details}></MarkdownPreview>
          </div>
        )}
      </div>

      {/* blog looking sample  */}
    </div>
  );
};

export default AddarticlesForm;
