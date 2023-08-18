"use client";
import { Job } from "@/app/postedJobs/page";
import {
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Divider,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <Heading size="lg">{job.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Company Name : {job?.companyName}</Text>

        <Text>Location : {job.location}</Text>
        <Text>Job Mode : {job.mode}</Text>
        <Text>Job Type : {job.type}</Text>
        <Text>Salary : {job.salary}</Text>
        <Text>Posted At : {dayjs(job.createdAt).format("DD/MM/YYYY")}</Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Button
            colorScheme="blue"
            onClick={() => router.push(`/jobInfo/${job._id}`)}
          >
            View Job
          </Button>
          <Button
            colorScheme="gray"
            onClick={() => router.push(`/companyInfo/${job.userId}`)}
          >
            About Us
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
