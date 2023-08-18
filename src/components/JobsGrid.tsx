"use client";
import { SimpleGrid, Container, Heading } from "@chakra-ui/react";
import JobCard from "./JobCard";
import { Job } from "@/app/postedJobs/page";

interface JobGridProps {
  jobs: Job[];
}

const JobGrid = ({ jobs }: JobGridProps) => {
  return (
    <Container maxW="3xl">
      <Heading as="h2" fontSize="2xl" my="20px">
        All Jobs
      </Heading>
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        spacing="20px"
        width="100%"
        my="15px"
      >
        {jobs?.map((job) => {
          return <JobCard key={job._id} job={job} />;
        })}
      </SimpleGrid>
    </Container>
  );
};

export default JobGrid;
