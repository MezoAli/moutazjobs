"use client";
import { Job } from "@/app/postedJobs/page";
import {
  Container,
  Heading,
  Text,
  Flex,
  Button,
  Divider,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
const JobInfo = ({ job }: { job: Job }) => {
  const router = useRouter();
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
        <Flex justifyContent="flex-start" alignItems="center" gap="20px">
          <Button variant="outline" onClick={() => router.back()}>
            Back to Jobs
          </Button>
          <Button
            bg="black"
            color="white"
            variant="solid"
            my="10px"
            width="fit-content"
            _hover={{ bg: "white", color: "black", border: "1px solid black" }}
          >
            Apply For Job
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default JobInfo;
