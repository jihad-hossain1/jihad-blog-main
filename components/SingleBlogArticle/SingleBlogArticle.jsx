import { formatTimestamp } from "@/utils/timeStemp";
import Link from "next/link";
import { FiMessageSquare } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";

const SingleBlogArticle = ({ blog }) => {
  //   const { _id } = blog;
  const getColor = (cardColor) => {
    let color = "border-slate-700";
    switch (cardColor.toLowerCase()) {
      case "html":
        color = "border-[#ff7473]";
        return color;
      case "css":
        color = "border-[#38b7ea]";
        return color;
      case "javascript":
        color = "border-[#ffc952]";
        return color;
      case "react":
        color = "border-[#087ea4]";
        return color;
      case "nodejs":
        color = "border-[#026e00]";
        return color;
    }
    return color;
  };
  return (
    <div className="">
      <div
        className={`border-l-[14px] ${getColor(
          blog?.articleCategory
        )} p-4 md:p-8 bg-white shadow-sm`}
      >
        <div>
          <div className="flex justify-between items-center mb-2 md:mb-4">
            <h4 className="text-xs text-gray-600">
              <p className="text-xs my-1">{formatTimestamp(blog?.createdAt)}</p>
            </h4>
            <p className="text-sm text-[#ff7473]">{blog?.articleCategory}</p>
          </div>
        </div>
        <hr className="h-[1px] w-full mb-2 md:mb-4" />
        <div className="mb-4">
          <Link
            href={`/blogsArticle/${blog?._id}`}
            className=" text-xl md:text-3xl font-semibold md:font-extrabold hover:underline"
          >
            {blog?.articleTitle}
          </Link>
        </div>
        <p className="break-all mb-2 md:mb-4 text-gray-600">
          {blog?.details?.detailsSingle || blog?.Details}...
        </p>
        <div className="flex items-center justify-between">
          <Link href={`/blogsArticle/${blog?._id}`} className="linkT">
            Read More
          </Link>
          <div className="flex items-center space-x-3 text-gray-500">
            <div className="flex space-x-2">
              <FiMessageSquare className="text-2xl" />
              <h4 className="hover:text-gray-900 cursor-pointer text-sm">{`${13} Response`}</h4>
            </div>
            <div className="flex space-x-2">
              <MdFavoriteBorder className="text-2xl" />
              <h4 className="hover:text-gray-900 cursor-pointer text-sm">{`1423`}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogArticle;
