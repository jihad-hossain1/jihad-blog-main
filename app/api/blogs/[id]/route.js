// import connectMongoDB from "@/database/connectMongoDB";
import connectMongoDB from "@/lib/mongodb";
import BlogDetail from "@/models/BlogDetail";
import Blog from "@/models/blog";
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

  await connectMongoDB();

  const blog = await Blog.findOne({ _id: id }).populate("details");

  return NextResponse.json({ blog }, { status: 200 });
}