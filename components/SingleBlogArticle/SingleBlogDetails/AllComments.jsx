"use client";

import SingleComment from "./singlecomment/SingleComment";

const AllComments = ({ allComments, isBlog }) => {
  return (
    <div className="flex flex-col gap-4">
      {allComments
        ?.filter((isComment) => isComment?.blogId === isBlog?._id)
        .map((comment) => (
          <SingleComment comment={comment} key={comment?._id} />
        ))}
    </div>
  );
};

export default AllComments;
