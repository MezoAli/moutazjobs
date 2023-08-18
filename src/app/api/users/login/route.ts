import { connectDB } from "@/config/mongodbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modals/userModal";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

interface TokenData {
  userId: string;
  userEmail: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw new Error("user not exist");
    }
    const verifiedPassword = await bcrypt.compare(
      body.password,
      user.password!
    );

    if (!verifiedPassword) {
      throw new Error("password is incorrect");
    }

    const dataToBeSigned = {
      userId: user._id,
      userEmail: user.email,
    } as unknown as TokenData;

    const token = jwt.sign(dataToBeSigned, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "log in successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
