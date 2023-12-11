import MainContainer from "@/components/MainContainer";
import SingleBlogDetails from "@/components/SingleBlogArticle/SingleBlogDetails/SingleBlogDetails";

const getBlogById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });
    //
    if (!res.ok) {
      throw new Error("failed to fetch blog");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const SingleBlogpage = async ({ params }) => {
  const { id } = params;
  const { blog } = await getBlogById(id);
  return (
    <MainContainer>
      <>
        <SingleBlogDetails id={id} blog={blog} />
      </>
    </MainContainer>
  );
};

export default SingleBlogpage;
