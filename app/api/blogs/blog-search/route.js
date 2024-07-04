import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

// Utility function to build search query
const buildSearchQuery = (searchTerm) => {
  if (!searchTerm) return {};

  const regex = { $regex: searchTerm, $options: "i" };
  return {
    $or: [{ articleTitle: regex }, { articleCategory: regex }],
  };
};

// Main handler function for GET request
export async function GET(req) {
   const { searchParams } = new URL(req.url);
   const searchTerm = searchParams.get("searchTerm") || "";
   try {
     // const searchParams = req.nextUrl.searchParams;
     // const searchTerm = searchParams.get("searchTerm") || "";

     await connectMongoDB();

     const searchQuery = buildSearchQuery(searchTerm);
     const data = await Blog.find(searchQuery);

     return NextResponse.json({ data });
   } catch (error) {
     console.error("Error fetching queries:", error);
     return NextResponse.json({ error: error?.message }, { status: 500 });
   }
}
