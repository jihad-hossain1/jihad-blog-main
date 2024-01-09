"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { GoTrash } from "react-icons/go";

const DeleteReply = ({ id, email, commentId }) => {
  const { data: session } = useSession();

  const router = useRouter();
  const handleDelete = async (rid) => {
    // console.log(rid);
    try {
      const res = await fetch(
        `/api/blogCommets/reply?commentId=${commentId}&replyId=${rid}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        router.refresh();
        toast.success("reply delete successfull");
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

export default DeleteReply;
