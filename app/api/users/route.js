import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { name, email, image, password } = await request.json();

  try {
    if (!email || !password) {
      return NextResponse.json(
        { error: "email & password are required " },
        { status: 409 }
      );
    }
    await connectMongoDB();
    const user = await User.findOne({ email });
    if (user?.email == email) {
      return NextResponse.json(
        { error: "user email already exist " },
        { status: 400 }
      );
    }
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    await User.create({ name, email, image, password: hashedPwd });

    return NextResponse.json(
      { message: "User Created Successfull" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "something error from server " },
      { status: 500 },
      { error }
    );
  }
}

export async function GET() {
  await connectMongoDB();

  const users = await User.find();

  return NextResponse.json({ users });
}
