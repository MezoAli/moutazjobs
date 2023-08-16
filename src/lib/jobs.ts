import axios from "axios";

export async function getAllJobs() {
  try {
    const res = await axios.get("/api/jobs");
    if (!res.data.data) {
      return "No Jobs is Available";
    }
    return res.data.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}
