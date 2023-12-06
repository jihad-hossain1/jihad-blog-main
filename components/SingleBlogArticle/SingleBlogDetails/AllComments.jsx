"use client";

const AllComments = ({ allComments, isBlog }) => {

  return (
    <div className="flex flex-col gap-4">
      {allComments
        ?.filter((isComment) => isComment?.blogId === isBlog?._id)
        .map((comment) => (
          <div key={comment?._id} className="p-4 bg-slate-50">
            <p className="break-all">{comment?.details}</p>
            <h4 className="font-semibold text-sm">
              comment-by: <span className="font-normal">{comment?.name}</span>
            </h4>
          </div>
        ))}
    </div>
  );
};

export default AllComments;
