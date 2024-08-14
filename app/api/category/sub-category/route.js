import { valid, validId, validMax } from "@/helpers/inputValidation";
import connectMongoDB from "@/lib/mongodb";
import { Category, SubCategory } from "@/models/category";
import { NextResponse } from "next/server";

// generate unique id auto increment
async function generateId() {
  const categories = await SubCategory.find();
  const id = categories.length + 1;
  return id.toString();
}

export async function POST(request) {
  const { name, catId } = await request.json();
  
  try {
    console.log("🚀 ~ POST ~ { name, catId }:", { name, catId })
    validMax(name, "Name", 1, 20);
    valid(catId, "Category");

    await connectMongoDB();

    const sortId = await generateId();

    const category = await SubCategory.findOne({
      name: name.trim(),
    });
    if (category) {
      return NextResponse.json(
        { error: "Category name already exists" },
        { status: 400 }
      );
    }

    const newCategory = new SubCategory({ name, uid: sortId, catId: catId });
    await newCategory.save();

    return NextResponse.json({ result: 'success', message: "Category Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(request) {
  const { searchParams } = new URL(request.nextUrl)
  const catId = searchParams.get('catId')
  try {
    await connectMongoDB();
    if(catId){
      const categories = await SubCategory.find({catId: catId});
      return NextResponse.json(categories);
    }else{
      const categories = await SubCategory.find({});
      return NextResponse.json(categories);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}