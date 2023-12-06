import AllComments from "./AllComments";
import CommentForm from "./CommentForm";
// all comment
const getComments = async () => {
  try {
    const res = await fetch(
      "https://jihad-blog-main.vercel.app/api/blogCommets",
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("failed to fatch");
    }
    return res.json();
  } catch (error) {
    console.log("error loading resume:", error);
  }
};
// single comment
const getCommentById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });
    //
    if (!res.ok) {
      throw new Error("failed to fetch product");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const Comments = async ({ bid }) => {
  const { comments } = await getComments();
  const allComments = [...comments];
  const { blog } = await getCommentById(bid);
  return (
    <div className="mt-20 text-xl ">
      <h3>Comments-Box: </h3>
      <div className="border border-slate-300 w-full h-96">
        <CommentForm bid={bid} />
        <AllComments allComments={allComments} isBlog={blog} />
      </div>
    </div>
  );
};

export default Comments;
