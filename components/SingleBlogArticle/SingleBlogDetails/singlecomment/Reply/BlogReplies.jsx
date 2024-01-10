"use client";


// import DeleteComment from "./DeleteComment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import { formatTimestamp } from "@/utils/timeStemp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteReply from "./DeleteReply";
import { MdHideSource, MdShare } from "react-icons/md";

import UpdateReply from "./UpdateReply";

const BlogReplies = ({ replies, commentId, blogId }) => {
  return (
    <div className="flex flex-col gap-2">
      {replies?.map((reply) => (
        <div key={reply?._id} className="flex gap-2">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <section className="flex flex-col gap-1 lg:min-w-[600px] ">
            <div className="p-4 bg-gray-200/50 rounded-md flex flex-col gap-1">
              <div className="flex justify-between">
                <h4 className="font-semibold text-sm uppercase">
                  {reply?.name}
                </h4>
                <div className="flex gap-2 items-center">
                  <p className="text-xs text-gray-600">
                    {formatTimestamp(reply?.createdAt)}
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
                        <UpdateReply
                          reply={reply}
                          commentId={commentId}
                          blogId={blogId}
                        />
                        <hr />
                        <DeleteReply
                          id={reply?._id}
                          email={reply?.email}
                          commentId={commentId}
                        />
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="break-all text-sm">{reply?.details}</p>
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
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default BlogReplies;
