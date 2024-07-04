import { validId } from "@/helpers/inputValidation";
import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    // Validate the ID
    validId(id, "user id");

    // Connect to MongoDB
    await connectMongoDB();

    // Find the user by ID
    const findUser = await User.findById(id);
    if (!findUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find blogs by user ID and reverse the order
    const blogs = await Blog.find({ "author.userId": id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
