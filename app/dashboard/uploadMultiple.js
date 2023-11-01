import axios from "axios";

export const uploadMultiple = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "multiple_preset");
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/dqfi9zw3e/image/upload`,
    formData
  );
  return { publicId: data?.public_id, url: data?.secure_url };
};

export const uploadMultiVideo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "multiple_video_preset");
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/dqfi9zw3e/video/upload`,
    formData
  );
  return { publicId: data?.public_id, url: data?.secure_url };
};