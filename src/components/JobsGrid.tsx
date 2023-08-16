"use client";
import { SimpleGrid } from "@chakra-ui/react";
import JobCard from "./JobCard";
import { Job } from "@/app/postedJobs/page";

interface JobGridProps {
  jobs: Job[];
}

const JobGrid = ({ jobs }: JobGridProps) => {
  return (
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
  );
};

export default JobGrid;
