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

const SingleComment = ({ comment }) => {
  const { data: session } = useSession();

  const handleUpdate = (cid) => {
    //
    // console.log(cid);
    // console.log(comment?._id);
  };

  const handleSession =
    session?.user.email === comment?.email
      ? "block flex items-center gap-4"
      : "hidden";

  const [replyToggle, setReplyToggle] = useState(false);
  return (
    <div key={comment?._id} className="flex gap-2">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <section className="flex flex-col gap-1">
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
                  <DropdownMenuItem onClick={() => handleUpdate()}>
                    <button className="flex items-center gap-5">
                      <span>Edit</span>
                      <TfiPencilAlt />
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className={handleSession}>
                      <span>Delete </span>
                      <DeleteComment id={comment?._id} />
                    </div>
                  </DropdownMenuItem>
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
          <BlogReplies replies={comment?.replies} />
        </div>
        {replyToggle && (
          <AddReply bid={comment?.blogId} commentId={comment?._id} />
        )}
      </section>
    </div>
  );
};

export default SingleComment;
