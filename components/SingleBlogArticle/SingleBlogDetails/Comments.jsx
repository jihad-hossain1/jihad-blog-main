import React from "react";
import CommentForm from "./CommentForm";

const Comments = ({ bid }) => {
  return (
    <div className="mt-20 text-xl ">
      <h3>Comments-Box: </h3>
      <div className="border border-slate-300 w-full h-96">
        <CommentForm bid={bid} />
      </div>
    </div>
  );
};

export default Comments;
