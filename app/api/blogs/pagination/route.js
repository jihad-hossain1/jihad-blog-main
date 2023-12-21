import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import { NextResponse, NextRequest } from "next/server";

const paginate = (data, page, itemsPerPage) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
};

export async function GET(request) {
    
  let { searchParams } = await request?.nextUrl;
  let page = parseFloat(searchParams.get("page"));
  const itemsPerpage = 3;

    try {
      
    await connectMongoDB();
    const blogs = await Blog.find();

    const paginateData = paginate(blogs, page, itemsPerpage);
        
    let myPagintionBlog = {
      itemsPerpage: itemsPerpage,
      data: paginateData,
      currentPage: parseFloat(page),
      totalPage: Math.ceil(blogs?.length / itemsPerpage),
      totoalBlog: blogs?.length,
    };
    return NextResponse.json(myPagintionBlog);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
