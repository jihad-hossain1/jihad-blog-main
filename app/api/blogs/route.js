import connectMongoDB from "@/lib/mongodb";
import BlogDetail from "@/models/BlogDetail";
// import connectMongoDB from "@/database/connectMongoDB";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  const body = await request.json();
  await connectMongoDB();
  let details = await BlogDetail.create(body.details);
  // await connectMongoDB();
  await Blog.create({
    ...body,
    details: details._id,
  });
  return NextResponse.json({ message: "Blog Created" }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const _b = await Blog.find()
  let blogs = _b.reverse();
  console.log(blogs);
  return NextResponse.json({ blogs });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ message: "Blog deleted" });
}