import axios from "axios";
import { Job } from "../../page";
import EditJobForm from "@/components/EditJobForm";

interface EditPageProps {
  params: {
    jobId: string;
  };
}

const getData = async (jobId: string) => {
  try {
    const res = await axios.get(`${process.env.SITE_URL}/api/jobs/${jobId}`);
    console.log(res);

    return res.data.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};
const EditPage = async (props: EditPageProps) => {
  const jobId = props.params.jobId;
  const jobData: Job = await getData(jobId);

  return <EditJobForm job={jobData} />;
};

export default EditPage;
