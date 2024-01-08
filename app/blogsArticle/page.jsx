import SingleBlogArticle from "@/components/SingleBlogArticle/SingleBlogArticle";
import { getColor } from "@/utils/getRandomColor";



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
const BlogPage = async () => {
  const { blogs } = await getBlogs();

  // const uniqueCategories = [
  //   ...new Set(blogs?.map(({ articleCategory }) => articleCategory)),
  // ];

  return (
    <div className="max-w-screen-xl mx-auto px-2 md:px-8 pb-6 min-h-screen ">
      <div>
        <div className="p-5">
          <div>
            {/* {blogs &&
              uniqueCategories?.map((uniquecategory, categoryIndex) => (
                <div className="mb-4" key={categoryIndex}>
                  <h4
                    className={`mb-3 text-xl uppercase border-b-2  w-fit ${getColor(
                      uniquecategory
                    )}`}
                  >
                    {uniquecategory}
                  </h4>
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
              ))} */}

            <div className="grid md:grid-cols-2  gap-6">
              {blogs?.map((filteredblog, _index) => (
                <SingleBlogArticle key={_index} blog={filteredblog} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
