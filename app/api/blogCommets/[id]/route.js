import connectMongoDB from '@/lib/mongodb';
import Comment from '@/models/comment';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const comment = await Comment.findOne({ _id: id });
  return NextResponse.json({ comment }, { status: 200 });
}


export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    await connectMongoDB();
    const update = await Comment.findByIdAndUpdate(id, {
      ...body
    })
      console.log(update);
    return NextResponse.json({ message: 'comment updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "not update some err:", error }, { status: 500 });
  }
}

export async function DELETE(req,{params}) {
  try {
      const { id } = params;
      await connectMongoDB();
      await Comment.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Comment deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "not delete some err:", error }, { status: 500 });
  }
}