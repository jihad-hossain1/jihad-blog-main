"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { GoTrash } from "react-icons/go";

const DeleteComment = ({ id, email }) => {
  const { data: session } = useSession();

  const router = useRouter();
  const handleDelete = async (cid) => {
    // console.log(cid);
    try {
      const res = await fetch(`/api/blogCommets?commentId=${cid}`, {
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
      {/* <Toaster /> */}
      <button
        onClick={() => handleDelete(id)}
        className={
          session?.user.email === email
            ? "flex items-center justify-between gap-5 px-2 hover:border-l-2 hover:border-r-2  hover:border-red-600 transition-all duration-150"
            : "hidden"
        }
      >
        Delete <GoTrash />
      </button>
    </>
  );
};

export default DeleteComment;
