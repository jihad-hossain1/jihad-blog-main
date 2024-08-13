import Link from "next/link";
import SingleBlogArticle from "../SingleBlogArticle/SingleBlogArticle";

const getBlogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blogs`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};

const OneBlogItem = async () => {
  let blogs = await getBlogs();

  return (
    <>
      <div className="border-l-[13px] border-gray-400 bg-gray-200/75  py-4 mb-4 flex justify-between px-3 items-center">
        <h4 className="">Recently Published</h4>
        <div>Posts: {blogs?.blogs?.length}</div>
      </div>

      {blogs?.blogs?.length > 0 ?
        <>
          <div className="flex flex-col gap-3">
            {blogs?.blogs?.slice(0, 6)?.map((blog) => (
              <SingleBlogArticle blog={blog} key={blog?._id} />
            ))
            }
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
        :
        <div className="flex justify-center items-center min-h-[40vh]">
          <h4>No Blogs Found.</h4>
        </div>

      }

    </>
  );
};

export default OneBlogItem;
