import { getCommentById, getComments } from "@/utils/fetchComments";
import AllComments from "./AllComments";
import CommentForm from "./CommentForm";

const Comments = async ({ bid }) => {
  const { comments } = await getComments();
  const allComments = [...comments];
  const { blog } = await getCommentById(bid);
  return (
    <div className="mt-20 text-xl ">
      <h3 className="my-2">Comments-Box: </h3>
      <div className="border border-slate-300 w-full h-full overflow-y-scroll">
        <CommentForm bid={bid} />
        <AllComments allComments={allComments} isBlog={blog} />
      </div>
    </div>
  );
};

export default Comments;
