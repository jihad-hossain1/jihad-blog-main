// import { getCommentById, getComments } from "@/utils/fetchComments";
import AllComments from "./AllComments";
import CommentForm from "./CommentForm";
import { FiThumbsUp } from "react-icons/fi";
import { TbMessage } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";

async function getCommentById(blogId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_BASE_URL}/api/blogCommets?blogId=${blogId}`,
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
      <div className="">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
            <FiThumbsUp size={22} />
            <span> Like</span>
          </button>
          <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
            <TbMessage size={22} />
            <span> Conmment</span>
          </button>
          <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
            <BiRepost size={22} />
            <span> Repost</span>
          </button>
          <button className="flex items-center gap-1 hover:bg-gray-300/90 px-3 hover:rounded-md py-2 transition-all duration-300">
            <IoIosSend size={22} />
            <span> Send</span>
          </button>
        </div>
      </div>
      <hr className="my-2 bg-slate-800" />
      <div className="overflow-y-scroll">
        <CommentForm bid={bid} />
        <AllComments allComments={comments?.comments} />
      </div>
    </div>
  );
};

export default Comments;
