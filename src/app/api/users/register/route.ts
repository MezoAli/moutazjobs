import { connectDB } from "@/config/mongodbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  return NextResponse.json({ message: "post get successfully", body });
}
