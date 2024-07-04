import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import { NextResponse, NextRequest } from "next/server";



export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const searchTerm = searchParams.get("searchTerm") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const parsedPage = page > 0 ? page : 1;
  const parsedPageSize = pageSize > 0 ? pageSize : 10;
  const parsedSortOrder = sortOrder === "desc" ? -1 : 1;

  // Build search query
  const searchQuery = searchTerm
    ? {
        $or: [
          {
            articleTitle: { $regex: searchTerm, $options: "i" },
            articleCategory: { $regex: searchTerm, $options: "i" },
          },
        ],
      }
    : {};

  // Calculate skip value
  const skip = (parsedPage - 1) * parsedPageSize;

  await connectMongoDB();

  const total = await Blog.countDocuments(searchQuery);

  // Fetch paginated data
  const data = await Blog.find(searchQuery)
    .sort({ [sortBy]: parsedSortOrder })
    .skip(skip)
    .limit(parsedPageSize);

  return NextResponse.json({
    meta: {
      total,
      page: parsedPage,
      limit: parsedPageSize,
    },
    data,
  });
}
