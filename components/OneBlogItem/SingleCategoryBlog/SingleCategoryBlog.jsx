import Link from "next/link";
import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";

const SingleCategoryBlog = ({ art }) => {
  const {
    articleTitle,
    articlePublishDate,
    Details,
    articleCategory,
    details,
    category,
  } = art;

  return (
    <div className="border-l-[14px] border-[#ffc952] p-4 md:p-8 bg-white shadow-sm ">
      <div>
        <div className="flex justify-between items-center mb-2 md:mb-4">
          <h4 className="text-xs text-gray-600">
            {articlePublishDate || `empty`}
          </h4>
          <p className="text-sm text-[#ffc952]">
            {articleCategory || category}
          </p>
        </div>
      </div>
      <hr className="h-[1px] w-full mb-2 md:mb-4" />
      <div className="mb-4">
        <Link
          href={`#`}
          className=" text-xl md:text-3xl font-semibold md:font-extrabold hover:underline"
        >
          {articleTitle}
        </Link>
      </div>
      <p className="break-all mb-2 md:mb-4 text-gray-600">
        {details?.slice(0, 500) || Details?.slice(0, 300)}...
      </p>
      <div className="flex items-center justify-between">
        <Link
          href={`#`}
          className="transition-all duration-300 rounded-3xl px-6 md:px-8 py-2 text-sm border border-neutral-200 text-gray-600 hover:text-gray-50 hover:bg-neutral-900"
        >
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
  );
};

export default SingleCategoryBlog;
