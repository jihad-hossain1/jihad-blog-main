
import connectMongoDB from "@/lib/mongodb";
import Comment from "@/models/comment";
// import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  await connectMongoDB();
  await Comment.create(body);
  return NextResponse.json({ message: "comment Created" }, { status: 200 });
}

//get all 
export async function GET() {
  await connectMongoDB();
  const comments = await Comment.find();
  return NextResponse.json({ comments });
}