"use client";
import { Job } from "@/app/postedJobs/page";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  Container,
  Heading,
  Text,
  Flex,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const JobInfo = ({ job }: { job: Job }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [applications, setApplications] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const getUserApplications = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(
        `/api/applications?userId=${user._id}&jobId=${job._id}`
      );
      setApplications(res.data.data);
    } catch (error: any) {
      toast({
        title: error.response.data.message || "something went wrong",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
  console.log(applications);

  useEffect(() => {
    getUserApplications();
  }, []);
  const handleApplyJob = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/applications", {
        user: user._id,
        job: job._id,
        status: "pending",
      });
      toast({
        title: res.data.message,
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: error.response.data.message || "something went wrong",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <Container maxW="3xl" my="20px">
      <Heading as="h2" fontSize="2xl" my="30px">
        Job Info
      </Heading>
      <Flex direction="column" gap="25px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Job Title
          </Text>
          <Text>{job.title}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Company Name
          </Text>
          <Button variant="link">
            <Link href={`/companyInfo/${job.userId}`}>{job.companyName}</Link>
          </Button>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Location
          </Text>
          <Text>{job.location}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Job Mode
          </Text>
          <Text>{job.mode}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Job Type
          </Text>
          <Text>{job.type}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Experience Required
          </Text>
          <Text>{job.experience}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Published At
          </Text>
          <Text>{dayjs(job.createdAt).format("DD/MM/YYYY")}</Text>
        </Flex>
        <Text fontWeight="semibold" fontSize="lg">
          Job Description
        </Text>
        <Divider />
        <Text>{job.description}</Text>
        {user.employmentType === "Employee" && (
          <Flex justifyContent="flex-start" alignItems="center" gap="20px">
            <Button variant="outline" onClick={() => router.back()}>
              Back to Jobs
            </Button>
            {applications.length === 0 ? (
              <Button
                bg="black"
                color="white"
                variant="solid"
                my="10px"
                width="fit-content"
                _hover={{
                  bg: "white",
                  color: "black",
                  border: "1px solid black",
                }}
                onClick={() => handleApplyJob()}
              >
                Apply For Job
              </Button>
            ) : (
              ""
            )}
            {applications.length > 0 && (
              <Text fontSize="2xl" color="red.400" fontWeight="semibold">
                You Already Applied For That Job
              </Text>
            )}
          </Flex>
        )}
      </Flex>
    </Container>
  );
};

export default JobInfo;
