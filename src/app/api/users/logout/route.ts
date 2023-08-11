import { connectDB } from "@/config/mongodbConfig";
import { NextResponse } from "next/server";
connectDB();

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout Successfully" },
      { status: 201 }
    );
    response.cookies.set("token", "", {});
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
