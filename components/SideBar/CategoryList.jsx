import Link from "next/link";
import React from "react";

const CategoryList = () => {
  return (
    <div className="bg-white ">
      <h4 className="p-6 text-gray-600 bg-gray-50/30">Category</h4>
      <ul className="text-sm">
        <Link href={`/blogsArticle`}>
          <li className="ctg-l">
            <h4 className="uppercase text-gray-600">CSS</h4>
            <div className="bg-[#38b7ea] rounded-full h-2 w-2"></div>
          </li>
        </Link>
        <Link href={`/blogsArticle`}>
          <li className="ctg-l">
            <h4 className="uppercase text-gray-600">Html</h4>
            <div className="bg-[#ff7473] rounded-full h-2 w-2"></div>
          </li>
        </Link>
        <Link href={`/blogsArticle`}>
          <li className="ctg-l">
            <h4 className=" text-gray-600">JavaScript</h4>
            <div className="bg-[#ffc952] rounded-full h-2 w-2"></div>
          </li>
        </Link>
        <Link href={`/blogsArticle`}>
          <li className="ctg-l">
            <h4 className=" text-gray-600">React</h4>
            <div className="bg-[#6dc8bf] rounded-full h-2 w-2"></div>
          </li>
        </Link>
        <Link href={`/blogsArticle`}>
          <li className="ctg-l">
            <h4 className=" text-gray-600">Others</h4>
            <div className="bg-gray-600 rounded-full h-2 w-2"></div>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default CategoryList;
