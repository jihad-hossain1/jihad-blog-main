import MainContainer from "@/components/MainContainer";
import SingleBlogDetails from "@/components/SingleBlogArticle/SingleBlogDetails/SingleBlogDetails";

const getBlogById = async (slug) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blogs/blog-by-slug?slug=${slug}`, {
      cache: "no-store",
    });
    const data = await res.json();
    // console.log("🚀 ~ getBlogById ~ data:", data)
    return data;
  } catch (error) {
    console.error(error);
  }
};


const SingleBlogpage = async ({ params }) => {
  const slug = params.slug;
  const blog = await getBlogById(slug);
  // console.log("🚀 ~ SingleBlogpage ~ blog:", blog)
  return (
    <MainContainer>
      <SingleBlogDetails details={blog?.details}  blog={blog?.blog} />
    </MainContainer>
  );
};

export default SingleBlogpage;
