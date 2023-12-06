"use client";

const AllComments = ({ allComments, isBlog }) => {
  //   console.log(allComments);
  //   console.log(isBlog?._id);
  return (
    <div>
      {allComments
        ?.filter((isComment) => isComment?.blogId === isBlog?._id)
        .map((comment) => (
          <div key={comment?._id}>
            <h4 className="font-semibold text-sm">{comment?.name}</h4>
            <p className="text-xs">{comment?.details}</p>
          </div>
        ))}
    </div>
  );
};

export default AllComments;
