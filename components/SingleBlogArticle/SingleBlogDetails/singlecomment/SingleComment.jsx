"use client";

import { TfiPencilAlt } from "react-icons/tfi";
import { useSession } from "next-auth/react";
import DeleteComment from "./DeleteComment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import { formatTimestamp } from "@/utils/timeStemp";

const SingleComment = ({ comment }) => {
  const { data: session } = useSession();

  const handleUpdate = (cid) => {
    //
    // console.log(cid);
  };
  const handleSession =
    session?.user.email === comment?.email
      ? "block flex items-center gap-4"
      : "hidden";
  return (
    <div key={comment?._id} className="flex gap-2">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="p-4 bg-gray-200/70 rounded-md">
        <div className="flex justify-between">
          <h4 className="font-semibold text-sm uppercase">{comment?.name}</h4>
          <div className="flex gap-2 items-center">
            <p className="text-xs text-gray-600">
              {formatTimestamp(comment?.createdAt)}
            </p>
            <button>
              <BsThreeDots />
            </button>
          </div>
        </div>
        <p className="break-all">{comment?.details}</p>

        <div className={handleSession}>
          <DeleteComment id={comment?._id} />
          <button onClick={() => handleUpdate(comment?._id)}>
            <TfiPencilAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
