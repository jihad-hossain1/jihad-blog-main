"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { uploadMultiple } from "../../uploadMultiple";

const MultipleUploadForm = () => {
  const [multiImage, setMultiImage] = useState([]);
  const [multiLink, setmultiLink] = useState([]);
  const [loading, setloading] = useState(false);

  const [toggleSeeGallary, settoggleSeeGallary] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(multiImage);
    try {
      setloading(true);
      let arr = [];
      for (let i = 0; i < multiImage.length; i++) {
        const data = await uploadMultiple(multiImage[i]);
        console.log(data);
        arr.push(data);
      }
      setmultiLink(arr);
      setloading(false);
      axios.post();
      toast.success("multiple image upload successfull");
      toast.success("check show upload button click");
      console.log(multiLink);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-4">
      <Toaster />
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image">Multiple Image Uplaod</label>
          <br />
          <input
            required
            className="border border-gray-400"
            type="file"
            name=""
            accept="image/*"
            id="image"
            multiple={true}
            onChange={(e) => setMultiImage(e.target.files)}
          />
        </div>
        <div>
          <button
            className="border border-gray-400 px-3 py-1 rounded "
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
      {loading && <h4>uploading.....</h4>}
      {/* <div className="mt-8 ml-10">
        <button
          onClick={() => settoggleSeeGallary(!toggleSeeGallary)}
          className="border border-blue-gray-500 px-6 py-2 rounded shadow drop-shadow-sm "
        >
          show uploaded items
        </button>
      </div> */}
      {/* {toggleSeeGallary && (
        <div className="grid md:grid-cols-4 ">
          {multiLink?.map((item) => (
            <div
              key={item?.url}
              className="border rounded border-r-blue-gray-300"
            >
              <img
                src={item?.url}
                className="max-w-[300px] object-cover"
                alt=""
              />
            </div>
          ))}
        </div>
      )}
      {toggleSeeGallary?.length == 0 && (
        <h4 className="text-blue-gray-900 mt-5">please upload some item</h4>
      )} */}
    </div>
  );
};

export default MultipleUploadForm;
