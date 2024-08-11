// import { getCommentById, getComments } from "@/utils/fetchComments";
import AllComments from "./AllComments";
import CommentForm from "./CommentForm";


async function getCommentById(blogId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/blogCommets?blogId=${blogId}`,
      {
        cache: "no-store",
      }
    );
    //
    if (!res.ok) {
      throw new Error("failed to fetch comments");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const Comments = async ({ bid }) => {
  const comments = await getCommentById(bid);

  return (
    <div className="mt-20  ">
      <div className="flex justify-between">
        <div>😉😊👌</div>
        <div>{comments?.comments?.length || 0} comments</div>
      </div>
      <hr className="my-2 bg-slate-800" />

      <div className="overflow-y-scroll">
        <CommentForm bid={bid} />
        <AllComments allComments={comments?.comments} bid={bid} />
      </div>
    </div>
  );
};

export default Comments;
