
import connectMongoDB from "@/lib/mongodb";
import Resume from "@/models/resume";
// import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  await connectMongoDB();
  await Resume.create(body);
  return NextResponse.json({ message: "rsm Created" }, { status: 200 });
}

//get all 
export async function GET() {
  await connectMongoDB();
  const resumes = await Resume.find();
  return NextResponse.json({ resumes });
}