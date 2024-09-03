import MainContainer from "@/components/MainContainer";
import SingleBlogDetails from "@/components/SingleBlogArticle/SingleBlogDetails/SingleBlogDetails";

const getBlogById = async (slug) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blogs/blog-by-slug?slug=${slug}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};


export async function generateMetadata({ params }) {
  const blog = await getBlogById(params.slug);
  const formateTag = blog?.blog?.tags?.join(",");
  return {
    title: blog?.blog?.articleTitle,
    description: blog?.blog?.sortContent,
    keywords: formateTag,
    openGraph: {
      title: blog?.blog?.articleTitle,
      description: blog?.blog?.sortContent,
      url: `https://jihad-blog-main.vercel.app/blogsArticle/${params.slug}`,
      images: [
        {
          url: blog?.blog?.details?.image,
        },
      ],
    },
  };
}

const SingleBlogpage = async ({ params }) => {
  const slug = params.slug;
  const blog = await getBlogById(slug);
  return (
    <MainContainer>
      <SingleBlogDetails details={blog?.details}  blog={blog?.blog} />
    </MainContainer>
  );
};

export default SingleBlogpage;
