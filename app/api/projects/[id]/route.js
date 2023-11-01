import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/project";
// import Topic from "@/models/topic";
import { NextResponse } from "next/server";
//update by single id
export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Project.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Project updated" }, { status: 200 });
}
//get single id
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const project = await Project.findOne({ _id: id });
  return NextResponse.json({ project }, { status: 200 });
}
