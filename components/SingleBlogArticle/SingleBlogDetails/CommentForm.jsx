"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LikeCommentRepost from "./singlecomment/LikeCommentRepost";
import { FiThumbsUp } from "react-icons/fi";
import { TbMessage } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { createComment } from "./comment-serveraction";

const CommentForm = ({ bid }) => {
  const [isFormToggle, setisFormToggle] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    details: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      return alert("login first");
    }
    try {
      const result = await createComment({
        info: {
          details: formData.details,
          name: session?.user?.name,
          email: session?.user?.email,
          photo: session?.user?.image,
          blogId: bid,
        },
      });

      if (result?.result) {
        toast.success(result?.message);
        setFormData({ details: "" });
        router.refresh();
      }

      if (result?.error) {
        toast.error(result?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <Toaster /> */}

      <>
        <div className="">
          <div className="flex items-center max-sm:flex-col max-sm:items-start gap-1">
            <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
              <FiThumbsUp size={22} />
              <span> Like</span>
            </button>
            <button
              onClick={() => setisFormToggle(!isFormToggle)}
              className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300"
            >
              <TbMessage size={22} />
              <span> Conmment</span>
            </button>
            <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
              <BiRepost size={22} />
              <span> Repost</span>
            </button>
            <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
              <IoIosSend size={22} />
              <span> Send</span>
            </button>
          </div>
        </div>
        <hr className="my-2 bg-slate-800" />
      </>
      {isFormToggle && (
        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="max-w-2xl flex gap-2">
              {session && (
                <div className="w-fit">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@user"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              )}
              <Textarea
                className="p-3 focus:outline-none border border-zinc-200 rounded shadow min-h-[30px]"
                required
                placeholder="Type your reply here."
                type="text"
                name="details"
                id="details"
                maxLength={200}
                value={formData?.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
              />
            </div>

            <div className="">
              <button
                type="submit"
                className={
                  formData?.details?.length == 0
                    ? "hidden"
                    : "block btn text-xs"
                }
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
