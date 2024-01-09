"use client";

import SingleComment from "./singlecomment/SingleComment";

const AllComments = ({ allComments }) => {
  return (
    <div className="p-3 flex flex-col gap-4">
      {allComments?.map((comment) => (
        <SingleComment comment={comment} key={comment?._id} />
      ))}
    </div>
  );
};

export default AllComments;
