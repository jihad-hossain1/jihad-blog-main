"use client";

import { TfiPencilAlt } from "react-icons/tfi";
import { useSession } from "next-auth/react";
import DeleteComment from "./DeleteComment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import { formatTimestamp } from "@/utils/timeStemp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import AddReply from "./Reply/AddReply";
import BlogReplies from "./Reply/BlogReplies";
import { MdHideSource } from "react-icons/md";
import { MdShare } from "react-icons/md";

const SingleComment = ({ comment }) => {
  const { data: session } = useSession();

  const handleUpdate = (cid) => {};

  const [replyToggle, setReplyToggle] = useState(false);
  return (
    <div className="flex gap-2">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <section className="flex flex-col gap-1 lg:min-w-[600px] ">
        <div className="p-4 bg-gray-200/70 rounded-md flex flex-col gap-1">
          <div className="flex justify-between">
            <h4 className="font-semibold text-sm uppercase">{comment?.name}</h4>
            <div className="flex gap-2 items-center">
              <p className="text-xs text-gray-600">
                {formatTimestamp(comment?.createdAt)}
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BsThreeDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="flex flex-col gap-2 py-2 ">
                    <button className="flex items-center justify-between gap-5 px-2 hover:border-l-2 hover:border-r-2 hover:border-green-600 transition-all duration-150">
                      <span>Share</span>
                      <MdShare />
                    </button>
                    <hr />
                    <button className="flex items-center justify-between gap-5 px-2 hover:border-l-2 hover:border-r-2 hover:border-orange-600 transition-all duration-150">
                      <span>Hide</span>
                      <MdHideSource />
                    </button>
                    <hr />
                    <button
                      onClick={() => handleUpdate()}
                      className="flex items-center justify-between gap-5 px-2 hover:border-l-2 hover:border-r-2 hover:border-green-600 transition-all duration-150"
                    >
                      <span>Edit</span>
                      <TfiPencilAlt />
                    </button>
                    <hr />
                    <DeleteComment id={comment?._id} email={comment?.email} />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="break-all text-sm">{comment?.details}</p>
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-sm">Like</TooltipTrigger>
                <TooltipContent className="flex items-center gap-2">
                  <button className="text-xl">👌</button>
                  <button className="text-xl">💕</button>
                  <button className="text-xl">👍</button>
                  <button className="text-xl">😒</button>
                  <button className="text-pink-600 text-xl">❤</button>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <hr className="h-3 border border-zinc-400" />
          <button
            className=" text-sm w-fit "
            onClick={() => setReplyToggle(!replyToggle)}
          >
            Reply
          </button>
        </div>
        <div>
          <BlogReplies replies={comment?.replies} commentId={comment?._id} />
        </div>
        {replyToggle && (
          <AddReply bid={comment?.blogId} commentId={comment?._id} />
        )}
      </section>
    </div>
  );
};

export default SingleComment;
