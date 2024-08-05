import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import Coment from "@/models/coment";
import { NextResponse } from "next/server";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";

  try {
    if (!slug) {
      return NextResponse.json({ error: "slug not found" }, { status: 400 });
    }

    await connectMongoDB();

    const blog = await Blog.findOne({ slug: slug }).populate("details");
    const populateBlogComents = await Coment.find({ blogId: blog?._id });

    return NextResponse.json(
      { blog, comments: populateBlogComents },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}