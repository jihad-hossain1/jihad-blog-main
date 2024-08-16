import { buildSearchQuery, parseQueryParams } from "@/helpers/paginated-helper";
import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import { SubCategory } from "@/models/category";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("searchTerm") || "";

  try {
    const { page, pageSize, sortBy, sortOrder,category,catId } =
      parseQueryParams(searchParams);
    // Define the fields you want to search through
    const searchFields = ["articleTitle", "articleCategory"];
    const searchQuery = buildSearchQuery(searchTerm, searchFields);
    const skip = (page - 1) * pageSize;

    await connectMongoDB();

    let blogs;
    const totalDocuments = await Blog.countDocuments(searchQuery);
     blogs = await Blog.find(searchQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(pageSize);

      const findCategory = await SubCategory.findOne({
        name: category
      })

    if(category){
      blogs = await Blog.find({
        $or: [
          // { articleCategory: category?.toLowerCase() },
          { catId: findCategory?.uid }
        ]
      })
      console.log("🚀 ~ GET ~ blogs:", blogs)
    }

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
