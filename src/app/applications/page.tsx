"use client";

import { setLoading } from "@/redux/slices/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  Container,
  Heading,
  useToast,
  Divider,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ApplicationsPage = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [applications, setApplications] = useState<any[]>([]);
  const getUserApplications = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/applications?userId=${user._id}`);
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
  return (
    <Container maxW="3xl">
      <Heading as="h2" fontSize="2xl" fontWeight="semibold" my="20px">
        Application Page
      </Heading>
      <Divider />
      {applications.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          gap="15px"
          w="100%"
          my="20px"
        >
          <Text>You Don't Have Any Applications For Jobs Yet</Text>
          <Text>Start Apply For Jobs</Text>
          <Button variant="outline" as={Link} href="/">
            Back to Jobs
          </Button>
        </Flex>
      )}
    </Container>
  );
};

export default ApplicationsPage;
