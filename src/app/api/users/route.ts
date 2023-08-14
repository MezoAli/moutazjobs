import { connectDB } from "@/config/mongodbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const user = await User.findByIdAndUpdate(reqBody._id, reqBody, {
      new: true,
    }).select("-password");
    console.log(user);
    if (!user) {
      throw new Error("No User Found");
    }
    return NextResponse.json({
      message: "Profile Updated Successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
