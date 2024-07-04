import { valid, validMax } from "@/helpers/inputValidation";
import connectMongoDB from "@/lib/mongodb";
import BlogDetail from "@/models/BlogDetail";
// import connectMongoDB from "@/database/connectMongoDB";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    articleTitle,
    articleCategory,
    sortContent,
    details: bDetails,
    author,
    slug,
  } = await request.json();

  try {
    validMax(articleTitle, "Article Title", 10, 100);
    validMax(articleCategory, "Article Category", 1, 50);
    validMax(sortContent, "Sort Content", 10, 250);
    valid(author.name, "Author Name");
    validMax(slug, "Slug", 5, 50);

    await connectMongoDB();

    const findSlug = await Blog.findOne({ slug: slug.trim() });
    if (findSlug) {
      return NextResponse.json(
        {
          error: "slug already exists",
        },
        { status: 400 }
      );
    }

    const details = await BlogDetail.create(bDetails);

    if (details) {
      const newBlog = await Blog.create({
        articleTitle: articleTitle.trim(),
        articleCategory,
        sortContent: sortContent.trim(),
        author,
        slug: slug.trim(),
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
