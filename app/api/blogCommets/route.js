
import connectMongoDB from "@/lib/mongodb";
import Comment from "@/models/comment";
// import Product from "@/models/product";
import { NextResponse } from "next/server";



export async function POST(request) {
  const body = await request.json();
  const blogId = await request.nextUrl.searchParams.get("blogId");

  try {
    if (blogId) {
      await connectMongoDB();
      await Comment.create(body);
      return NextResponse.json(
        { message: `blog comment created for ${blogId}` },
        { status: 200 }
      );
    } else {
      NextResponse.json({ message: "blogId are not found" });
    }
  } catch (error) {
    NextResponse.json(error);
  }
}

//get singleblog by  comments
export async function GET(request) {
  const blogId = await request.nextUrl.searchParams.get("blogId");
  try {
    if (blogId) {
      await connectMongoDB();
      const comments = await Comment.find({ blogId }).sort({
        createdAt: "desc",
      });
      // console.log(comments);
      // const comments = await Comment.find();
      return NextResponse.json({ comments });
    } else {
      NextResponse.json({ message: "blogId are not found" });
    }
  } catch (error) {
    NextResponse.json(error);
  }
}

export async function DELETE(request) {
  const commentId = await request.nextUrl.searchParams.get("commentId");
  try {
    if (commentId) {
      await connectMongoDB();

      await Comment.findByIdAndDelete({ _id: commentId });

      return NextResponse.json({ message: "Comment deleted successfull" });
    } else {
      NextResponse.json({ message: "commentId are not found" });
    }
  } catch (error) {
    NextResponse.json(error);
  }
}

export async function PUT(request) {
  const body = await request.json();
  const blogId = await request.nextUrl.searchParams.get("blogId");
  const commentId = await request.nextUrl.searchParams.get("commentId");
  try {
    if (commentId && blogId) {
      await connectMongoDB();

      const _updt = await Comment.findByIdAndUpdate(
        commentId,
        { details: body?.details },
        { new: true }
      );

      if (!_updt) {
        return NextResponse.json({ message: "blog comment are not found" });
      }

      console.log(_updt);
      // const comments = await Comment.find();
      return NextResponse.json(_updt);
    } else {
      NextResponse.json({ message: "commentId are not found" });
    }
  } catch (error) {
    NextResponse.json(error);
  }
}



