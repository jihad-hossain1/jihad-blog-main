import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import { NextResponse, NextRequest } from "next/server";

// Helper function to build the search query
const buildSearchQuery = (searchTerm) => {
  if (!searchTerm) return {};
  const regex = { $regex: searchTerm, $options: "i" };
  return {
    $or: [{ articleTitle: regex }, { articleCategory: regex }],
  };
};

// Helper function to parse query parameters
const parseQueryParams = (searchParams) => {
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  return {
    page: page > 0 ? page : 1,
    pageSize: pageSize > 0 ? pageSize : 10,
    sortBy,
    sortOrder: sortOrder === "desc" ? -1 : 1,
  };
};

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const { page, pageSize, sortBy, sortOrder } =
      parseQueryParams(searchParams);
    const searchTerm = searchParams.get("searchTerm") || "";

    const searchQuery = buildSearchQuery(searchTerm);
    const skip = (page - 1) * pageSize;

    await connectMongoDB();

    const totalDocuments = await Blog.countDocuments(searchQuery);
    const blogs = await Blog.find(searchQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(pageSize);

    return NextResponse.json({
      meta: {
        total: totalDocuments,
        page,
        limit: pageSize,
      },
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.error();
  }
}
