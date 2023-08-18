import Job from "@/modals/jobModal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const job = await Job.findById(params.jobId);
    return NextResponse.json(
      { message: "get job data successfully", data: job },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const reqBody = await req.json();
    const job = await Job.findByIdAndUpdate(params.jobId, reqBody, {
      new: true,
    });

    return NextResponse.json(
      { message: "Job Updated Successfully", data: job },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const job = await Job.findByIdAndDelete(params.jobId);

    return NextResponse.json(
      { message: "Job Deleted Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
