"use client";

import { TfiPencilAlt } from "react-icons/tfi";
import { useSession } from "next-auth/react";
import DeleteComment from "./DeleteComment";

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
    <div key={comment?._id} className="p-4 bg-slate-50 flex flex-col gap-3">
      <p className="break-all">{comment?.details}</p>
      <h4 className="font-semibold text-sm">
        comment-by: <span className="font-normal">{comment?.name}</span>
      </h4>
      <div className={handleSession}>
        <DeleteComment id={comment?._id} />
        <button onClick={() => handleUpdate(comment?._id)}>
          <TfiPencilAlt />
        </button>
      </div>
    </div>
  );
};

export default SingleComment;
