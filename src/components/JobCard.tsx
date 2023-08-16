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

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="lg">{job.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Job Description : {job.description}</Text>

        <Text>Location : {job.location}</Text>
        <Text>Job Mode : {job.mode}</Text>
        <Text>Job Type : {job.type}</Text>
        <Text>Experience Required : {job.experience} Year</Text>
        <Text>Salary : {job.salary}</Text>
        <Text>Posted At : {dayjs(job.createdAt).format("DD/MM/YYYY")}</Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Button colorScheme="blue">Apply</Button>
          <Button colorScheme="gray">About Us</Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
