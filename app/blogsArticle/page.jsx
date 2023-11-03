import SingleBlogArticle from "@/components/SingleBlogArticle/SingleBlogArticle";

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
const BlogPage = async () => {
  const { blogs } = await getBlogs();

  const uniqueCategories = [
    ...new Set(blogs?.map(({ articleCategory }) => articleCategory)),
  ];
  console.log(uniqueCategories);
  return (
    <div className="max-w-screen-xl mx-auto px-2 md:px-8 pb-6 min-h-screen ">
      <div>
        <div className="p-5">
          <div>
            {blogs &&
              uniqueCategories?.map((uniquecategory, categoryIndex) => (
                <div className="mb-4" key={categoryIndex}>
                  <h4>{uniquecategory}</h4>
                  <div className="grid md:grid-cols-2  gap-6">
                    {blogs
                      ?.filter(
                        (blog) => blog.articleCategory === uniquecategory
                      )
                      .map((filteredblog, _index) => (
                        <SingleBlogArticle key={_index} blog={filteredblog} />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
