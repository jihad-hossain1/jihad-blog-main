// import connectMongoDB from "@/database/connectMongoDB";
import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


//update by single id
export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Blog.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Blog updated" }, { status: 200 });
}
//get single id
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const blog = await Blog.findOne({ _id: id });
  return NextResponse.json({ blog }, { status: 200 });
}