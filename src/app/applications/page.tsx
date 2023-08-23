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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "MoutazJobs | Application Page",
  description: "applicanion page of employee",
};

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
      {applications.length > 0 && (
        <TableContainer width="100%">
          <Table variant="striped" colorScheme="blackAlpha">
            <TableCaption>Applications</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">Application Id</Th>
                <Th textAlign="center">Job Title</Th>
                <Th textAlign="center">Company Name</Th>
                <Th textAlign="center">Job Posted At</Th>
                <Th textAlign="center">Application Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {applications.map((app) => {
                return (
                  <Tr key={app._id}>
                    <Td textAlign="center">{app?._id}</Td>
                    <Td textAlign="center">{app?.job?.title}</Td>
                    <Td textAlign="center">{app?.job?.companyName}</Td>
                    <Td textAlign="center">
                      {dayjs(app?.job?.createdAt).format("DD/MM/YYYY")}
                    </Td>
                    <Td textAlign="center">{app?.status}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ApplicationsPage;
