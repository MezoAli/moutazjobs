import Job from "@/modals/jobModal";
import { NextRequest, NextResponse } from "next/server";

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
