import { valid, validMax } from "@/helpers/inputValidation";
import { modSlug } from "@/helpers/modText";
import connectMongoDB from "@/lib/mongodb";
import BlogDetail from "@/models/BlogDetail";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    articleTitle,
    articleCategory,
    sortContent,
    details: bDetails,
    author,
  } = await request.json();

  try {
    validMax(articleTitle, "Article Title", 10, 100);
    validMax(articleCategory, "Article Category", 1, 50);
    validMax(sortContent, "Sort Content", 10, 250);
    valid(author.name, "Author Name");

    await connectMongoDB();

    const details = await BlogDetail.create(bDetails);
    const modifySlug  = await modSlug(articleTitle,Blog);

    if (details) {
      const newBlog = await Blog.create({
        articleTitle: articleTitle.trim(),
        articleCategory,
        sortContent: sortContent.trim(),
        author,
        slug: modifySlug,
      });

      if (!newBlog) {
        return NextResponse.json(
          {
            error: "blog not created",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { result: newBlog, message: "Blog Created" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  const _b = await Blog.find();
  let blogs = _b.reverse();
  // console.log(blogs);
  return NextResponse.json({ blogs });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ message: "Blog deleted" });
}
