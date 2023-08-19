import { connectDB } from "@/config/mongodbConfig";
import Application from "@/modals/applicationModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const application = await Application.create(reqBody);
    return NextResponse.json(
      {
        message: "Your Application Has Been Sent Successfully",
        data: application,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");
    const filterObject: any = {};
    if (userId) {
      filterObject.userId = userId;
    }
    const applications = await Application.find(filterObject).populate("jobs");
    return NextResponse.json(
      { message: "get Data", data: applications },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
