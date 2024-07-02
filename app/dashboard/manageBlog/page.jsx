import { fetchBlogs } from "@/utils/fetch/blogs/fetchBlogs";
import SingleBlog from "./SingleBlog";

const ManageBlogPage = async () => {
  const items = await fetchBlogs();

  return (
    <div>
      <h4 className="my-4 text-zinc-900 underline">
        Manage your BlogPage: {items?.blogs?.length}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items?.blogs?.map((itm) => (
          <SingleBlog key={itm?._id} itm={itm} />
        ))}
      </div>
    </div>
  );
};

export default ManageBlogPage;
