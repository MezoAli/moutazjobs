import { Job } from "@/app/postedJobs/page";
import JobInfo from "@/components/JobInfo";
import axios from "axios";

const getData = async (jobId: string) => {
  try {
    const res = await axios.get(`${process.env.SITE_URL}/api/jobs/${jobId}`);

    return res.data.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export async function generateMetadata({
  params: { jobId },
}: {
  params: { jobId: string };
}) {
  const res = await axios.get(`${process.env.SITE_URL}/api/jobs/${jobId}`);
  return {
    title: res.data.data.title,
    description: res.data.data.description,
  };
}

const JobInfoPage = async ({
  params: { jobId },
}: {
  params: { jobId: string };
}) => {
  const jobData: Job = await getData(jobId);
  return <JobInfo job={jobData} />;
};

export default JobInfoPage;
