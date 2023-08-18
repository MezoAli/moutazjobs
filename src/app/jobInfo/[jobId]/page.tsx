import { Job } from "@/app/postedJobs/page";
import axios from "axios";

const getData = async (jobId: string) => {
  try {
    const res = await axios.get(`${process.env.SITE_URL}/api/jobs/${jobId}`);
    console.log(res);

    return res.data.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

const JobInfoPage = async ({
  params: { jobId },
}: {
  params: { jobId: string };
}) => {
  const jobData: Job = await getData(jobId);
  return <div> jobTitle : {jobData.title}</div>;
};

export default JobInfoPage;
