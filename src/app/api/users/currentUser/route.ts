import { verifyJWT } from "@/lib/verifyJWT";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const decodedData: any = verifyJWT(req);
    const user = await User.findById(decodedData.userId).select("-password");

    return NextResponse.json({ message: "connect", data: user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
