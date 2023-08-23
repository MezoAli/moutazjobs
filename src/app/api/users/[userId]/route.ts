import { connectDB } from "@/config/mongodbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const user = await User.findById(userId).select("-password");
    return NextResponse.json(
      { message: "get user data successfully", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
