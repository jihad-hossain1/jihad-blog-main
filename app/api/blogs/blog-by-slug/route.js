import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import BlogDetail from "@/models/BlogDetail";
import Coment from "@/models/coment";
import { NextResponse } from "next/server";


export async function GET(request) {
  const { searchParams } = new URL(request.nextUrl);
  const slug = searchParams.get("slug") || "";

  try {
    if (!slug) {
      return NextResponse.json({ error: "slug not found" }, { status: 400 });
    }

    await connectMongoDB();

    const blog = await Blog.findOne({ slug: slug })
  
    const findDetails = await BlogDetail.findOne({ _id: blog?.details });

    return NextResponse.json(
      { blog: blog, details: findDetails },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}