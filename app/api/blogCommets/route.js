import connectMongoDB from "@/lib/mongodb";
import Coment from "@/models/coment";
import Comment from "@/models/comment";
import Reply from "@/models/replies";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { blogId, content, userId, parentReplyId } = await req.json();

    console.log(blogId, content, userId, parentReplyId);
    await connectMongoDB();

    if (parentReplyId) {
      // Check if the parent reply exists
      let parentReply = await Reply.findById(parentReplyId);
      if (!parentReply) {
        // If parent reply not found in Reply model, check in the Comment model
        parentReply = await Coment.findByIdAndUpdate(parentReplyId, {
          $push: { replies: { content, userId, parentReplyId } },
        });
        return NextResponse.json(
          { success: true, data: parentReply },
          { status: 200 }
        );
      } else {
        // Parent found in Reply model
        const newReply = new Reply({
          content,
          userId,
          parentReplyId,
        });
        const save = await newReply.save();
        return NextResponse.json(
          { success: true, data: save },
          { status: 200 }
        );
      }
    } else {
      // Create new comment
      const newComment = new Coment({
        content,
        blogId,
        userId,
      });
      await newComment.save();
      return NextResponse.json(
        { success: true, data: newComment },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// export async function POST(request) {
//   const body = await request.json();
//   const blogId = await request.nextUrl.searchParams.get("blogId");

//   try {
//     if (blogId) {
//       await connectMongoDB();
//       await Comment.create(body);
//       return NextResponse.json(
//         { message: `blog comment created for ${blogId}` },
//         { status: 200 }
//       );
//     } else {
//       NextResponse.json({ message: "blogId are not found" });
//     }
//   } catch (error) {
//     NextResponse.json(error);
//   }
// }

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
