"use client";

import { formatTimestamp } from "@/utils/timeStemp";
import Link from "next/link";
import CommentReactionCount from "./CommentReactionCount";
import Layout from "../Layout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SingleBlogArticle = ({ blog }) => {
  const getColor = (cardColor) => {
    let color = "border-slate-700";
    switch (cardColor?.toLowerCase()) {
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
  useGSAP(() => {
    gsap.fromTo(
      ".textgsap",
      {
        // opacity: 0,
        duration: 0.5,
        x: -16,
        y: -26,
        ease: "back.out",
        stagger: 0.1,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "back.inOut",
        delay: 0.5,
      }
    );
  }, [blog]);
  return (
    <Layout>
      <div
        className={`border-l-[14px] textgsap opacity-0 ${getColor(
          blog?.articleCategory
        )} p-2 bg-white rounded shadow-sm`}
      >
        <div>
          <div className="flex justify-between items-center p-2">
            <h4 className="text-xs text-gray-600">
              <p className="text-xs my-1">{formatTimestamp(blog?.createdAt)}</p>
            </h4>
            <p className="text-sm text-[#ff7473]">{blog?.articleCategory}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <hr className="h-[1px] w-full" />
          <div className="">
            <Link
              href={`/blogsArticle/${blog?.slug}`}
              className="  text-sm lg:text-lg font-semibold hover:underline"
            >
              {blog?.articleTitle}
            </Link>
          </div>
          <p className="break-all text-xs lg:text-sm text-gray-600">
            {blog?.sortContent?.slice(0, 200)}...
          </p>
          <div className="flex items-center justify-between">
            <Link href={`/blogsArticle/${blog?.slug}`} className="linkT">
              Read More
            </Link>
            <div className="flex items-center space-x-3 text-gray-500">
              <CommentReactionCount bid={blog?._id} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleBlogArticle;
