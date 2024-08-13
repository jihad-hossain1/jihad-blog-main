import { validMax } from "@/helpers/inputValidation";
import connectMongoDB from "@/lib/mongodb";
import { Category } from "@/models/category";
import { NextResponse } from "next/server";

// generate unique id auto increment
async function generateId() {
  return Date.now().toString(5) + Math.random().toString(5);
}

export async function POST(request) {
  const { name } = await request.json();

  try {
    validMax(name, "Name", 1, 20);

    await connectMongoDB();

    const sortId = await generateId();

    const category = await Category.findOne({
      name: name.trim(),
    });

    if (category) {
      return NextResponse.json(
        { error: "Category name already exists" },
        { status: 400 }
      );
    }

    const newCategory = new Category({ name, uid: sortId });
   const result = await newCategory.save();

    return NextResponse.json({ result: result, message: "Category Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectMongoDB();
    const categories = await Category.find();
    console.log("🚀 ~ GET ~ categories:", categories)
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}