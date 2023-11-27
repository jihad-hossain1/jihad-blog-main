
import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  await connectMongoDB();
  await Product.create(body);
  return NextResponse.json({ message: "pr Created" }, { status: 200 });
}

//get all 
export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json({ products });
}