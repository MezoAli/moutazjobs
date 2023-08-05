import { connectDB } from "@/config/mongodbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modals/userModal";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await User.findOne({ email: body.email });
    if (user) {
      throw new Error("user already exist");
    }
    const hashedPassword = await bcrypt.hash(body.password, 12);
    body.password = hashedPassword;
    await User.create(body);
    return NextResponse.json(
      { message: "user created successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
