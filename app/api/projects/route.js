import connectMongoDB from "@/lib/mongodb";
import Project from "@/models/project";
// import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title,
    details,
      images,
      gitlink,
      livelink,
      videoLink,
      image,category} = await request.json();
  await connectMongoDB();
  await Project.create({ title,
      details,
      gitlink,
    livelink,
      images,
      videoLink,
      image,category});
  return NextResponse.json({ message: "Project Created" }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const projects = await Project.find();
  return NextResponse.json({ projects });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ message: "project deleted" });
}
