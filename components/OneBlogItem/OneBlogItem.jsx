import React from "react";
import SingleCategoryBlog from "./SingleCategoryBlog/SingleCategoryBlog";
import HtmlSingleBlog from "./SingleCategoryBlog/HtmlSingleBlog";
import CssSingleBlog from "./SingleCategoryBlog/CssSingleBlog";

// const getBlogs = async () => {
//   try {
//     // https://jihad-blog-main.vercel.app
//     const res = await fetch("https://jihad-blog-main.vercel.app/api/blogs", {
//       cache: "no-store",
//     });
//     if (!res.ok) {
//       throw new Error("failed to fatch");
//     }
//     return res.json();
//   } catch (error) {
//     console.log("error loading blogs:", error);
//   }
// };

const OneBlogItem = async () => {
  // const { blogs } = await getBlogs();
  // const itmesBlog = [...blogs].reverse();
  // const javascript = itmesBlog?.filter(
  //   (item) => item?.category === "javascript"
  // );
  // const htmls = itmesBlog?.filter((item) => item?.articleCategory === "html");
  // const css = itmesBlog?.filter((item) => item?.articleCategory === "css");
  // return (
  //   <div>
  //     <div className="mb-3 grid gap-3">
  //       {javascript.slice(0, 1).map((art) => (
  //         <SingleCategoryBlog art={art} key={art?._id} />
  //       ))}
  //     </div>
  //     <div className="mb-3 grid gap-3">
  //       {htmls.slice(0, 1).map((art) => (
  //         <HtmlSingleBlog art={art} key={art?._id} />
  //       ))}
  //     </div>
  //     <div className="mb-3 grid gap-3">
  //       {css.slice(0, 1).map((art) => (
  //         <CssSingleBlog art={art} key={art?._id} />
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default OneBlogItem;
