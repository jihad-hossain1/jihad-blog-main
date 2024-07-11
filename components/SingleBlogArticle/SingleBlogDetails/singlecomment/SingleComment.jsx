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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SingleComment = ({ comment }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [replyToggle, setReplyToggle] = useState(false);
  const [details, setDetials] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const upInfo = {
      details,
    };
    try {
      const res = await fetch(
        `/api/blogCommets?blogId=${comment?.blogId}&commentId=${comment?._id}`,
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
      <div className="flex gap-2">
        <div>
          <Avatar>
            <AvatarImage
              src={comment?.photo || "https://github.com/shadcn.png"}
              alt="@user"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <section className="flex flex-col gap-1 lg:min-w-[600px] ">
          <div className="p-4 bg-gray-200/70 rounded-md flex flex-col gap-1">
            <div className="flex justify-between">
              <h4 className="font-semibold text-sm uppercase">
                {comment?.name}
              </h4>
              <div className="flex gap-2 items-center">
                <p className="text-xs text-gray-600">
                  {new Date(comment?.createdAt).toLocaleDateString("en-US")}
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
                      <button className="flex items-center justify-between gap-5 px-2 hover:border-l-2 hover:border-r-2 hover:border-orange-600 transition-all duration-150">
                        <span>Hide</span>
                        <MdHideSource />
                      </button>

                      <Dialog>
                        <DialogTrigger>
                          <button
                            className={
                              session?.user.email === comment?.email
                                ? "flex items-center justify-between gap-5 px-2 hover:border-l-2 hover:border-r-2 hover:border-green-600 transition-all duration-150"
                                : "hidden"
                            }
                          >
                            <span>Edit</span>
                            <TfiPencilAlt />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <h4 className="text-center my-3">Edit Comment</h4>
                          <div className="p-3 ">
                            <form
                              onSubmit={handleUpdate}
                              className="max-w-lg mx-auto"
                            >
                              <Textarea
                                className={"w-full"}
                                onChange={(e) => setDetials(e.target.value)}
                                defaultValue={comment?.details}
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

                      {session?.user.email === comment?.email && (
                        <DeleteComment
                          id={comment?._id}
                          email={comment?.email}
                        />
                      )}
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
            <BlogReplies
              replies={comment?.replies}
              commentId={comment?._id}
              blogId={comment?.blogId}
            />
          </div>
          {replyToggle && (
            <AddReply bid={comment?.blogId} commentId={comment?._id} />
          )}
        </section>
      </div>
    </>
  );
};

export default SingleComment;
