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

      let newReply = await Comment.findByIdAndUpdate(
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
      console.log(newReply);
      return NextResponse.json({ message: "reply added successfull" });
    } else {
      return NextResponse.json({ message: "blogId, commentId are not match" });
    }
  } catch (error) {
    return NextResponse.json({ message: `some probmlem got: ${error}` });
  }
}

export async function GET(request) {
  const body = await request.json();
  const blogId = await request.nextUrl.searchParams.get("blogId");
  const commentId = await request.nextUrl.searchParams.get("commentId");

  try {
    console.log(body, blogId, commentId);
    return NextResponse.json({ message: "reply added successfull" });
  } catch (error) {
    return NextResponse.json({ message: `some probmlem got: ${error}` });
  }
}
