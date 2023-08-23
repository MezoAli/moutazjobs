"use client";
import { SimpleGrid, Container, Heading } from "@chakra-ui/react";
import JobCard from "./JobCard";
import { Job } from "@/app/postedJobs/page";
import { useState } from "react";
import { Flex, FormControl, Input, FormLabel, Text } from "@chakra-ui/react";
interface JobGridProps {
  jobs: Job[];
}

const JobGrid = ({ jobs }: JobGridProps) => {
  // const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  // console.log(filteredJobs);
  // console.log(location, title);

  // useEffect(() => {
  //   setFilteredJobs((jobs) => {
  //     return jobs.filter((job) => {
  //       return (
  //         job.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()) ||
  //         job.location.toLowerCase().includes(location.toLowerCase())
  //       );
  //     });
  //   });

  //   if (title === "") {
  //     setFilteredJobs(jobs);
  //   }
  // }, [title, location]);

  return (
    <Container maxW="3xl">
      <Heading as="h2" fontSize="2xl" my="20px">
        All Jobs
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" gap="20px">
        <FormControl>
          <FormLabel>Filter By Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: React js Developer"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Filter By Location</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: Cairo ,Assiut ,Remote , etc..."
          />
        </FormControl>
      </Flex>
      {jobs.length === 0 && (
        <Text textAlign="center" fontWeight="semibold">
          No Jobs Found
        </Text>
      )}
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        spacing="20px"
        width="100%"
        my="15px"
      >
        {jobs
          ?.filter((job) => {
            return title.toLowerCase() === ""
              ? job
              : job.title.toLowerCase().includes(title.toLowerCase());
          })
          .filter((job) => {
            return location.toLowerCase() === ""
              ? job
              : job.location.toLowerCase().includes(location.toLowerCase());
          })
          .map((job) => {
            return <JobCard key={job._id} job={job} />;
          })}
      </SimpleGrid>
    </Container>
  );
};

export default JobGrid;
