// "use client";

import SingleArticle from "./SingleArticle";

const getBlogs = async () => {
  try {
    // https://jihad-blog-main.vercel.app
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

const BlogArticles = async () => {
  const { blogs } = await getBlogs();
  return (
    <div>
      {/* <h4>top ar</h4> */}
      <div className="mb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  sm:max-w-sm sm:mx-auto lg:max-w-full p-2 md:px-10">
          {blogs.slice(0, 2).map((article) => (
            <SingleArticle key={article._id} article={article}></SingleArticle>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3  sm:max-w-sm sm:mx-auto lg:max-w-full p-2 md:px-10">
        {blogs.slice(2, 5).map((article) => (
          <SingleArticle key={article._id} article={article}></SingleArticle>
        ))}
      </div>
    </div>
  );
};

export default BlogArticles;
