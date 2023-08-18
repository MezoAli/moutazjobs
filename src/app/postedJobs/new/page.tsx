"use client";
import AddNewJobForm from "@/components/AddNewJobForm";
import { useAppSelector } from "@/redux/store/hooks";
import { Container, Flex, Heading, Button, Divider } from "@chakra-ui/react";
import { redirect, useRouter } from "next/navigation";

const PostedJobsPage = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  if (user.employmentType !== "Employer") {
    redirect("/");
  }
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
