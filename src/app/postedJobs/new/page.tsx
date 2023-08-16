"use client";
import AddNewJobForm from "@/components/AddNewJobForm";
import { Container, Flex, Heading, Button, Divider } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const PostedJobsPage = () => {
  const router = useRouter();
  return (
    <Container maxW="3xl">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="lg" mb="20px" mt="20px">
          New Job
        </Heading>
        <Button
          bg="black"
          color="white"
          variant="solid"
          _hover={{ bg: "white", color: "black", border: "1px solid black" }}
          onClick={() => router.back()}
        >
          Back To Jobs
        </Button>
      </Flex>
      <Divider />
      <AddNewJobForm />
    </Container>
  );
};

export default PostedJobsPage;
