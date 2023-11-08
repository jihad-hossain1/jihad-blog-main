import SingleBlog from "./SingleBlog";

const getBlogs = async () => {
  try {
    // const res = await fetch("/api/topics", {
    //   cache: "no-store",
    // });
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/blogs`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to fatch");
    }
    return res.json();
  } catch (error) {
    console.log("error loading topics:", error);
  }
};

const ManageBlogPage = async () => {
  const { blogs } = await getBlogs();
  console.log(blogs);
  return (
    <div>
      <h4 className="my-4 text-zinc-900 underline">
        Manage your BlogPage: {blogs?.length}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogs?.map((itm) => (
          <SingleBlog key={itm?._id} itm={itm} />
        ))}
      </div>
    </div>
  );
};

export default ManageBlogPage;
