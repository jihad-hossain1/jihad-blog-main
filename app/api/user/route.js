import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email,image } = await request.json();
  await connectMongoDB();
  await User.create({ name, email,image });
  return NextResponse.json({ message: "User Created" }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}