import BlogPreview from "@/app/addBlog/BlogPreview";
import MarkdownPreview from "@/app/addBlog/MarkdownPreview";
import React from "react";

const DetailsBlog = ({ details, detail }) => {
  return (
    <>
      <div>
        {/* <BlogPreview details={details} /> */}
        <MarkdownPreview details={details}></MarkdownPreview>
        {/* <p className="text-lg text-gray-500 break-all mb-4">
          {details?.detailsSingle || detail}
        </p>
        {details?.mores.length > 0
          ? details?.mores?.map((itm, i) => (
              <p className="break-all mb-3 text-lg text-gray-500" key={i}>
                {itm}
              </p>
            ))
          : null} */}
      </div>
      {/* blog link  */}
    </>
  );
};

export default DetailsBlog;
