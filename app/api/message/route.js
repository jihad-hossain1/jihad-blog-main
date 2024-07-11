import { valid, validMax } from "@/helpers/inputValidation";
import connectMongoDB from "@/lib/mongodb";
import Message from "@/models/message";
import { NextResponse } from "next/server";
import { buildSearchQuery, parseQueryParams } from "@/helpers/paginated-helper";

export async function POST(request) {
  const { name, email, subject, content } = await request.json();
  try {
    validMax(name, "Name", 1, 20);
    validMax(subject, "Subject", 1, 50);
    validMax(content, "Content", 10, 500);
    validMax(email, "Email", 1, 50);

    await connectMongoDB();

    const newMessage = new Message({
      name,
      email,
      subject,
      content,
    });

    await newMessage.save();

    return NextResponse.json(
      { message: "message created", result: "success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// paginated get method

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm") || "";

  try {
    const { page, pageSize, sortBy, sortOrder } =
      parseQueryParams(searchParams);
    // Define the fields you want to search through
    const searchFields = ["name", "email", "subject"];
    const searchQuery = buildSearchQuery(searchTerm, searchFields);
    const skip = (page - 1) * pageSize;

    await connectMongoDB();

    const totalDocuments = await Message.countDocuments(searchQuery);
    const messages = await Message.find(searchQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(pageSize);

    return NextResponse.json({
      meta: {
        total: totalDocuments,
        page,
        limit: pageSize,
      },
      data: messages,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
