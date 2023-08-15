"use client";
import { Container, Flex, Heading, Button, Divider } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const PostedJobsPage = () => {
  const router = useRouter();
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
    </Container>
  );
};

export default PostedJobsPage;
