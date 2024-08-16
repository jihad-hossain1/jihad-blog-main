import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.nextUrl);

    const catId = searchParams.get("catId");
    const category = searchParams.get("category");

    try {
        await connectMongoDB();
        const findBlogs = await Blog.find({
            $or: [{ catId: catId }, { articleCategory: category?.toLowerCase() }],
        });

        return NextResponse.json({ data: findBlogs });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
