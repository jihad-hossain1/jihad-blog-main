"use client";

import { TfiPencilAlt } from "react-icons/tfi";
import { useSession } from "next-auth/react";
// import DeleteComment from "./DeleteComment";
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

const BlogReplies = ({ replies }) => {
  const { data: session } = useSession();

  const handleUpdate = (cid) => {
    //
    // console.log(cid);
    // console.log(comment?._id);
  };

  //   const handleSession =
  //     session?.user.email === comment?.email
  //       ? "block flex items-center gap-4"
  //       : "hidden";
  return (
    <>
      {replies?.map((reply) => (
        <div key={reply?._id} className="flex gap-2">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <section className="flex flex-col gap-1">
            <div className="p-4 bg-gray-200/70 rounded-md flex flex-col gap-1">
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
                      <DropdownMenuItem onClick={() => handleUpdate()}>
                        <button className="flex items-center gap-5">
                          <span>Edit</span>
                          <TfiPencilAlt />
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div
                          className={
                            session?.user.email === reply?.email
                              ? " flex items-center gap-4"
                              : "hidden"
                          }
                        >
                          <span>Delete </span>
                          {/* <DeleteComment id={reply?._id} /> */}
                        </div>
                      </DropdownMenuItem>
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
    </>
  );
};

export default BlogReplies;
