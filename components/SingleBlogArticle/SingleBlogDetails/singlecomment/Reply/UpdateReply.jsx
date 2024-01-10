"use client";

import { TfiPencilAlt } from "react-icons/tfi";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const UpdateReply = ({ reply, blogId, commentId }) => {
  const { data: session } = useSession();
  const [details, setDetials] = useState("");
  const router = useRouter();
  const replyId = reply?._id;

  const handleUpdate = async (e) => {
    e.preventDefault();

    const upInfo = {
      details,
    };
    try {
      const res = await fetch(
        `/api/blogCommets/reply?blogId=${blogId}&commentId=${commentId}&replyId=${replyId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(upInfo),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update comment");
      }
      // router.push("/");
      toast.success("Your comment update successfull");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <button
            className={
              session?.user.email === reply?.email
                ? "flex items-center justify-between gap-5 px-2 hover:border-l-2 hover:border-r-2 hover:border-green-600 transition-all duration-150"
                : "hidden"
            }
          >
            <span>Edit</span>
            <TfiPencilAlt />
          </button>
        </DialogTrigger>
        <DialogContent>
          <h4 className="text-center my-3">Edit Reply</h4>
          <div className="p-3 ">
            <form onSubmit={handleUpdate} className="max-w-lg mx-auto">
              <Textarea
                className={"w-full"}
                onChange={(e) => setDetials(e.target.value)}
                defaultValue={reply?.details}
                placeholder="Edit Details"
                required
                cols="10"
                rows="7"
                maxLength={200}
              />

              <div className="flex justify-end items-center gap-2">
                <DialogClose asChild>
                  <button
                    type="submit"
                    className="mt-4 text-xs bg-gray-800 px-3 py-2 rounded-md border shadow-sm hover:shadow text-gray-50"
                  >
                    Update
                  </button>
                </DialogClose>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="mt-4 text-xs bg-red-600 px-3 py-2 rounded-md border shadow-sm hover:shadow text-gray-50"
                  >
                    Cancel
                  </button>
                </DialogClose>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateReply;
