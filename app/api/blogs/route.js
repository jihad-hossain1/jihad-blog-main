import connectMongoDB from "@/lib/mongodb";
// import connectMongoDB from "@/database/connectMongoDB";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function POST(request) {
  // const body = await request.json();
  const { articleTitle,
      articleCategory,
      details,
      image ,user} = await request.json();
  await connectMongoDB();
  await Blog.create({ articleTitle,
      articleCategory,
      details,
      user,
      image });
  // await Blog.create(body)
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