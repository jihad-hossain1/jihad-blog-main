import connectMongoDB from "@/lib/mongodb";
import Comment from "@/models/comment";
// import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const blogId = await request.nextUrl.searchParams.get("blogId");
  const commentId = await request.nextUrl.searchParams.get("commentId");

  try {
    if (blogId && commentId) {
      console.log(body, blogId, commentId);
      await connectMongoDB();

      await Comment.findByIdAndUpdate(
        { _id: commentId },
        {
          $push: {
            replies: body,
          },
        },
        {
          new: true,
        }
      );

      return NextResponse.json({ message: "reply added successfull" });
    } else {
      return NextResponse.json({ message: "blogId, commentId are not match" });
    }
  } catch (error) {
    return NextResponse.json({ message: `some probmlem got: ${error}` });
  }
}

export async function DELETE(request) {
  const replyId = await request.nextUrl.searchParams.get("replyId");
  const commentId = await request.nextUrl.searchParams.get("commentId");

  try {
    if (replyId && commentId) {
      await connectMongoDB();

      const comment = await Comment.findByIdAndUpdate(
        { _id: commentId },
        { $pull: { replies: { _id: replyId } } },
        { new: true }
      );

      // console.log(newReply);
      // console.log(comment);
      return NextResponse.json(comment);
    } else {
      return NextResponse.json({ message: "replyId, commentId are not match" });
    }
  } catch (error) {
    return NextResponse.json({ message: `some probmlem got: ${error}` });
  }
}
