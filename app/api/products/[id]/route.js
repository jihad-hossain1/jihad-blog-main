
import connectMongoDB from '@/lib/mongodb';
import Product from '@/models/product';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  // console.log(req);
  try {
      const { id } = params;
      await connectMongoDB();
      const product = await Product.findOne({_id: id})
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "not found product some err:", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  // console.log(req);
  try {
    const { id } = params;
    const body = await req.json();
    await connectMongoDB();
    await Product.findByIdAndUpdate(id, {
      ...body
    })
      
    return NextResponse.json({ message: 'product updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "not update some err:", error }, { status: 500 });
  }
}

export async function DELETE(req,{params}) {
  // console.log(req);
  try {
      const { id } = params;
      await connectMongoDB();
      await Product.findByIdAndDelete(id)
    return NextResponse.json({ message: 'product deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "not delete some err:", error }, { status: 500 });
  }
}