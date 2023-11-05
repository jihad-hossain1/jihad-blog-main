// 'use client'

import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleArticle = ({ article }) => {
  const getColorText = (bg) => {
    let color = `bg-gray-700`;

    switch (bg) {
      case "html":
        color = `bg-[#b0c6d5]`;
        return color;
      case "css":
        color = `bg-[#fe6a3f]`;
        return color;
      case "javascript":
        color = ` bg-[#ffc952]`;
        return color;
      case "react":
        color = `bg-[#72cef3]`;
        return color;
      case "nodejs":
        color = `bg-[#026e00]`;
        return color;
      case "graphics":
        color = `bg-[#6ec8c0]`;
        return color;
    }
    return color;
  };
  return (
    <div
      className={`p-4 rounded-md  shadow-[0px_2px_6px_rgba(0,0,0,0.25)] hover:shadow-[0px_2px_9px_rgba(0,0,0,0.25)] transition-all duration-300 ${getColorText(
        article?.articleCategory
      )}`}
    >
      <Image
        width={300}
        height={300}
        className="w-full rounded-md"
        src={article?.image}
        alt=""
      />
      <div className=" flex justify-between mt-4">
        <div>
          <Link
            href={`/blogsArticle`}
            className="hover:underline text-xl font-bold"
          >
            {article?.articleTitle}
          </Link>
          <h4 className="font-semibold">{article?.articleCategory}</h4>
        </div>
        <h4 className="text-sm md:text-md ">
          Publish {article?.articlePublishDate}
        </h4>
      </div>
    </div>
  );
};

export default SingleArticle;
