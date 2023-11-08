import UpdateBlogForm from "../UpdateBlogForm";

const getBlogsById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });
    //
    if (!res.ok) {
      throw new Error("failed to fetch project");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const UpdateBlogPage = async ({ params }) => {
  const { id } = params;
  const { blog } = await getBlogsById(id);

  return (
    <div className="max-w-screen-xl mx-auto px-2 py-4">
      <h4 className="text-center my-6">
        <span className="text-zinc-800 uppercase underline font-semibold text-xl mr-4">
          Update:
        </span>{" "}
        {`"${blog?.articleTitle}"`}
      </h4>
      <div>
        <UpdateBlogForm id={id} blog={blog} />
      </div>
    </div>
  );
};

export default UpdateBlogPage;
