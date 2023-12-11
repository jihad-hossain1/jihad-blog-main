import SingleBlogArticle from "../SingleBlogArticle/SingleBlogArticle";
import ReverseBlogs from "./ReverseBlogs";

const getBlogs = async () => {
  try {
    const res = await fetch("https://jihad-blog-main.vercel.app/api/blogs", {
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
  const { blogs } = await getBlogs();

  const itmesBlog = [...blogs].reverse();
  const javascript = itmesBlog?.filter(
    (item) => item?.articleCategory === "javascript"
  );
  // console.log(javascript);
  const htmls = itmesBlog?.filter((item) => item?.articleCategory === "html");
  const css = itmesBlog?.filter((item) => item?.articleCategory === "css");
  return (
    <>
      <div>
        <ReverseBlogs itmesBlog={itmesBlog} />
      </div>
      <div className="hidden">
        <div className="mb-3 grid gap-3">
          {javascript.slice(0, 1).map((art) => (
            <SingleBlogArticle blog={art} key={art?._id} />
          ))}
        </div>
        <div className="mb-3 grid gap-3">
          {htmls.slice(0, 1).map((art) => (
            <SingleBlogArticle blog={art} key={art?._id} />
          ))}
        </div>
        <div className="mb-3 grid gap-3">
          {css.slice(0, 1).map((art) => (
            <SingleBlogArticle blog={art} key={art?._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OneBlogItem;
