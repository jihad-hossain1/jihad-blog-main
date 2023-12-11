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
  const itmesBlog = [...blogs];

  const javascript = itmesBlog?.filter(
    (item) => item?.articleCategory === "javascript"
  );
  let lastJavaScriptBlog = javascript?.at(-1);

  const htmls = itmesBlog?.filter((item) => item?.articleCategory === "html");
  let lastHtmlsBlog = htmls?.at(-1);

  const css = itmesBlog?.filter((item) => item?.articleCategory === "css");
  let lastCssBlog = css?.at(-1);

  return (
    <>
      {/* <div>
        <ReverseBlogs itmesBlog={itmesBlog} />
      </div> */}
      <div className="flex flex-col gap-4">
        <div>
          <SingleBlogArticle blog={lastJavaScriptBlog} />
        </div>
        {/* <div className="mb-3 grid gap-3">
          {javascript?.slice(0, 1).map((art) => (
            <SingleBlogArticle blog={art} key={art?._id} />
          ))}
        </div> */}
        {/* <div className="mb-3 grid gap-3">
          {htmls.slice(0, 1).map((art) => (
            <SingleBlogArticle blog={art} key={art?._id} />
          ))}
        </div> */}
        <div>
          <SingleBlogArticle blog={lastHtmlsBlog} />
        </div>
        {/* <div className="mb-3 grid gap-3">
          {css.slice(0, 1).map((art) => (
            <SingleBlogArticle blog={art} key={art?._id} />
          ))}
        </div> */}
        <div>
          <SingleBlogArticle blog={lastCssBlog} />
        </div>
      </div>
    </>
  );
};

export default OneBlogItem;
