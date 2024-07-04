import { getComments } from "@/utils/fetchComments";
import Link from "next/link";
import { FiMessageSquare } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";

const CommentReactionCount = ({ bid }) => {
  // const { comments } = await getComments();
  // const allComments = [...comments];
  // const inBlogCount = allComments?.filter((item) => item?.blogId === bid);
  return (
    <>
      {/* <Link href={`/blogsArticle/${bid}`} className="flex space-x-2">
        <FiMessageSquare className="text-2xl" />
        <h4 className="hover:text-gray-900 cursor-pointer text-sm">
          {inBlogCount?.length} response
        </h4>
      </Link>
      <div className="flex space-x-2 cursor-pointer">
        <MdFavoriteBorder className="text-2xl" />
        <h4 className="hover:text-gray-900 cursor-pointer text-sm">
          {[].length}
        </h4>
      </div> */}
    </>
  );
};

export default CommentReactionCount;
