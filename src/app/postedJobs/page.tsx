"use client";
import JobsTable from "@/components/JobsTable";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { Container, Flex, Heading, Button, Divider } from "@chakra-ui/react";
import axios from "axios";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Job {
  createdAt: string;
  description: string;
  employerEmail: string;
  experience: string;
  location: string;
  mode: string;
  salary: string;
  title: string;
  type: string;
  updatedAt: string;
  userId: string;
  _id: string;
  companyName: string;
}

export const metadata: Metadata = {
  title: "Posted Jobs Page",
  description: "Posted Jobs Page",
};

const PostedJobsPage = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const getJobs = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs?userId=${user._id}`);
      setJobs(res.data.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getJobs();
  }, []);

  return (
    <Container maxW="3xl">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="lg" mb="20px" mt="20px">
          Posted Jobs
        </Heading>
        <Button
          bg="black"
          color="white"
          variant="solid"
          _hover={{ bg: "white", color: "black", border: "1px solid black" }}
          onClick={() => router.push("/postedJobs/new")}
        >
          Post New Job
        </Button>
      </Flex>
      <Divider />
      <JobsTable jobs={jobs} />
    </Container>
  );
};

export default PostedJobsPage;
