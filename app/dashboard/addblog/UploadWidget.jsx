import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Triangle } from "react-loader-spinner";

const UploadWidget = () => {
  const [video, setVideo] = useState(null);
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? image : video);
    data.append(
      "upload_preset",
      type === "image" ? "images_presets" : "videos_presets"
    );

    try {
      let cloudName = import.meta.env.VITE_CLOUDNARY_NAME;
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      console.log(res);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);

      //upload image file
      const imgUrl = await uploadFile("image");

      //upload video file
      const videoUrl = await uploadFile("video");

      //send backend api request
      // await axios.post(`${import.meta.env.VITE_BASE_URL}/api/videos`, {
      //   imgUrl,
      //   videoUrl,
      // });
      // reset states
      setimage(null);
      setVideo(null);

      toast.success("file upload success");
      console.log(imgUrl, videoUrl);
      setloading(false);
      const form = e.target;
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Toaster />
      <form
        className="grid md:flex items-center gap-3"
        action=""
        onSubmit={handleSubmit}
      >
        <div className="mb-4 md:mb-0">
          <label htmlFor="video">Video Upload</label>
          <br />
          <input
            className="border border-gray-500 focus:outline-none"
            type="file"
            name=""
            accept="video/*"
            id="video"
            onChange={(e) => setVideo((prev) => e.target.files[0])}
          />
        </div>
        <div className="mb-4 md:mb-0">
          <label htmlFor="images">Image Upload</label>
          <br />
          <input
            className="border border-gray-500 focus:outline-none"
            type="file"
            name=""
            accept="image/*"
            id="images"
            onChange={(e) => setimage((prev) => e.target.files[0])}
          />
        </div>
        <div className="md:mt-4">
          <button
            className="border border-gray-400 rounded px-3 py-1"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
      {loading && (
        <Triangle
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
    </div>
  );
};

export default UploadWidget;
