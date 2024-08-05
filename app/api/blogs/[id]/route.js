// import connectMongoDB from "@/database/connectMongoDB";
import { modSlug } from "@/helpers/modText";
import connectMongoDB from "@/lib/mongodb";
import BlogDetail from "@/models/BlogDetail";
import Blog from "@/models/blog";
import Coment from "@/models/coment";
import { NextResponse } from "next/server";

//update by single id
export async function PUT(request, { params }) {
  const { id } = params;
  const {
    articleTitle,
    details,
    image,
  } = await request.json();

 try {
   await connectMongoDB();
 
   const modSlugs = await modSlug(articleTitle,Blog)
 
  const newUpdate = await Blog.findByIdAndUpdate(id, { articleTitle: articleTitle?.trim(), slug: modSlugs }, {
   new: true,
  });
 
   return NextResponse.json({result: "success", message: "Blog updated" }, { status: 200 });

 } catch (error) {
  return NextResponse.json({ error: error?.message }, { status: 500 });
 }
}
//get single id
export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    const blog = await Blog.findOne({ _id: id }).populate("details");

    const populateBlogComents = await Coment.find({ blogId: id });

    return NextResponse.json(
      { blog, comments: populateBlogComents },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}