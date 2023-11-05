import connectMongoDB from "@/lib/mongodb";
import User from "@/models/register";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';


export async function POST(req) {
    try {
        const { name, email, password, image } = await req.json();
        const hashedPassword = await bcrypt.hash(password,10)
        await connectMongoDB()
        await User.create({ name, email, password: hashedPassword,image })
        return NextResponse.json({message: 'user register successfll'},{status: 200})
    } catch (error) {
         return NextResponse.json({message: 'user register failed: ',error},{status: 200})
    }
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}