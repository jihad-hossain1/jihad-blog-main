import connectMongoDB from "@/lib/mongodb";
// import connectMongoDB from "@/database/connectMongoDB";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function POST(request) {
  // const body = await request.json();
  const { articleTitle,
      articleCategory,
      details,
      author,
      email,
      blog_links,
      videoLink,
      image } = await request.json();
  await connectMongoDB();
  await Blog.create({ articleTitle,
      articleCategory,
      details,
      author,
      email,
      blog_links,
      videoLink,
      image });
  // await Blog.create(body)
  return NextResponse.json({ message: "Blog Created" }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const blogs = await Blog.find();
  return NextResponse.json({ blogs });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ message: "Blog deleted" });
}