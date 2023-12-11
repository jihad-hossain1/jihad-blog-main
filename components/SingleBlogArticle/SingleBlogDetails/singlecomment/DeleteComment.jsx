"use client";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { GoTrash } from "react-icons/go";

const DeleteComment = ({ id }) => {
  const router = useRouter();
  const handleDelete = async (cid) => {
    // console.log(cid);
    try {
      const res = await fetch(`/api/blogCommets/${cid}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
        toast.success("comment delete successfull");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Toaster />
      <button onClick={() => handleDelete(id)}>
        <GoTrash />
      </button>
    </>
  );
};

export default DeleteComment;
