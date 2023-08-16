import axios from "axios";
import { cookies } from "next/headers";
import JobsGrid from "@/components/JobsGrid";

const getUser = async () => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const res = await axios.get(`${process.env.SITE_URL}/api/users/currentUser`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  return res.data.data;
};

const getAllJobs = async () => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const res = await axios.get(`${process.env.SITE_URL}/api/jobs`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  return res.data.data;
};
export default async function Home() {
  const user: any = await getUser();
  const jobs: any = await getAllJobs();
  console.log(jobs);

  return <JobsGrid jobs={jobs} />;
}
