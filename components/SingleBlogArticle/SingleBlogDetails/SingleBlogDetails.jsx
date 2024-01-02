import ShareContent from "./ShareContent";
import NewBlogBadge from "./NewBlogBadge";
import DetailsBlog from "./DetailsBlog";
import VideoFrame from "./VideoFrame";
import Comments from "./Comments";
import BlogLinks from "./BlogLinks";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

const SingleBlogDetails = ({ blog, id }) => {
  const getColorText = (bg) => {
    let color = `bg-gray-700`;

    switch (bg.toLowerCase()) {
      case "html":
        color = `bg-[#ff7473]`;
        return color;
      case "css":
        color = `bg-[#38b7ea]`;
        return color;
      case "javascript":
        color = ` bg-[#ffc952]`;
        return color;
      case "react":
        color = `bg-[#087ea4]`;
        return color;
      case "nodejs":
        color = `bg-[#026e00]`;
        return color;
    }
    return color;
  };
  return (
    <div className="p-1 flex flex-col gap-2">
      <div className="flex justify-start">
        <Link
          href={"/blogsArticle"}
          className="hover:text-blue-600 flex  gap-1 items-center"
        >
          <IoIosArrowRoundBack size={23} /> {"Back to Blogs"}
        </Link>
      </div>
      <div className="flex flex-col md:flex-row  justify-between gap-5">
        <main className="w-full">
          <div className="flex justify-between ">
            <NewBlogBadge timeSt={blog?.createdAt} />
            <h4 className={`${getColorText(blog?.articleCategory)} bdg`}>
              {blog?.articleCategory}
            </h4>
          </div>
          <hr className="h-1 my-6" />
          <div>
            <img
              className="max-h-[500px] w-full object-cover rounded-lg mb-3"
              src={blog?.image}
              alt="blog image"
            />
          </div>
          <div>
            <h3 className="mb-4">{blog?.articleTitle}</h3>
            <DetailsBlog details={blog?.details} />
          </div>
          <div>
            <VideoFrame videoUrl={blog?.videoLink} />
          </div>
          <BlogLinks blog_links={blog?.blog_links} />
          <div>
            <Comments bid={blog?._id} />
          </div>
        </main>
        {/* share content  */}
        <div className="md:flex justify-end">
          <ShareContent bid={blog?._id} />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogDetails;
