import { connectDB } from "@/config/mongodbConfig";
import { sendMail } from "@/lib/sendMail";
import Application from "@/modals/applicationModel";
import dayjs from "dayjs";
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
    const jobId = searchParams.get("jobId");
    const filterObject: any = {};
    if (userId) {
      filterObject.user = userId;
    }
    if (jobId) {
      filterObject.job = jobId;
    }
    const applications = await Application.find(filterObject)
      .populate("job")
      .populate("user");
    return NextResponse.json(
      { message: "get Data", data: applications },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId");
    const reqBody = await req.json();

    const application = await Application.findByIdAndUpdate(appId, reqBody, {
      new: true,
    })
      .populate("user")
      .populate("job");

    console.log("application : ", application);

    await sendMail({
      to: application.user.email,
      subject: "Your Application Status Has Been Updated",
      text: `Your Application Status Has Been Updated to ${application.status}`,
      html: `<div>
      <p>Your Application Status For ${
        application.job.title
      } Has Been Updated to ${application.status}</p>
      <p>Company Name : ${application.job.companyName}</p>
      <p>Your Application was Sent at ${dayjs(application.createdAt).format(
        "DD/MM/YYYY"
      )}</p>
      <p>Thank You For Using MoutazJobs</p>
      </div>`,
    });

    return NextResponse.json(
      { message: "Applicant Status Updated Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
