import { connectDB } from "@/config/mongodbConfig";
import { verifyJWT } from "@/lib/verifyJWT";
import Job from "@/modals/jobModal";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const job = await Job.create(reqBody);
    return NextResponse.json(
      { message: "Job Created Successfully", data: job },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const decodedData: any = verifyJWT(req);
    const jobs = await Job.find({ userId: decodedData.userId });
    return NextResponse.json(
      { message: "get Data", data: jobs },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
