// import connectMongoDB from "@/database/connectMongoDB";
import connectMongoDB from "@/lib/mongodb";
import BlogDetail from "@/models/BlogDetail";
import Blog from "@/models/blog";
import Coment from "@/models/coment";
import { NextResponse } from "next/server";

//update by single id
export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newArticleTitle: articleTitle,
    newDetails: details,
    newImage: image,
  } = await request.json();
  await connectMongoDB();
  await Blog.findByIdAndUpdate(id, { articleTitle, details, image });
  return NextResponse.json({ message: "Blog updated" }, { status: 200 });
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