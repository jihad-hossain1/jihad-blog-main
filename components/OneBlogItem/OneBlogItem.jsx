import Link from "next/link";
import SingleBlogArticle from "../SingleBlogArticle/SingleBlogArticle";

const getBlogs = async () => {
  try {
    const res = await fetch(`https://jihad-blog-main.vercel.app/api/blogs`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to fatch");
    }
    return res.json();
  } catch (error) {
    console.log("error loading blogs:", error);
  }
};

const OneBlogItem = async () => {
  let { blogs } = await getBlogs();

  return (
    <>
      <div className="border-l-[13px] border-gray-400 bg-gray-200/75  py-4 mb-4 flex justify-between px-3 items-center">
        <h4 className="">Recently Published</h4>
        <div>Posts: {blogs?.length}</div>
      </div>
      <div className="flex flex-col gap-3">
        {blogs?.slice(0, 6).map((blog) => (
          <SingleBlogArticle blog={blog} key={blog?._id} />
        ))}
      </div>
      <div className="text-end mt-2">
        <Link
          href={"/blogsArticle"}
          className="border-b border-blue-600 w-fit hover:text-blue-300 hover:translate-x-1 ease-in-out hover:pb-1 transition-all duration-300 "
        >
          See More Blog
        </Link>
      </div>
    </>
  );
};

export default OneBlogItem;
