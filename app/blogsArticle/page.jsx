import SingleBlogArticle from "@/components/SingleBlogArticle/SingleBlogArticle";
import { getColor } from "@/utils/getRandomColor";

// export async function generateStaticParams() {
//   const res = await fetch("https://jihad-blog-main.vercel.app/api/blogs");
//   const { blogs } = await res.json();
//   return blogs?.map((blog) => ({
//     id: blog?._id,
//   }));
// }


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
  // console.log(uniqueCategories);

  return (
    <div className="max-w-screen-xl mx-auto px-2 md:px-8 pb-6 min-h-screen ">
      <div>
        <div className="p-5">
          <div>
            {blogs &&
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
