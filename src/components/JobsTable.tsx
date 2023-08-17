"use client";
import { Job } from "@/app/postedJobs/page";
import {
  Flex,
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
import dayjs from "dayjs";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface JobTableProps {
  jobs: Job[];
}
const JobsTable = ({ jobs }: JobTableProps) => {
  const router = useRouter();
  return (
    <>
      <TableContainer width="100%" my="30px">
        <Table variant="striped" colorScheme="blackAlpha">
          <TableCaption>Jobs</TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center">Title</Th>
              <Th textAlign="center">Posted On</Th>
              <Th textAlign="center">Location</Th>
              <Th textAlign="center">Job Type</Th>
              <Th textAlign="center">Work Mode</Th>
              <Th textAlign="center">Experience</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs.map((job) => {
              return (
                <Tr key={job._id}>
                  <Td textAlign="center">{job.title}</Td>
                  <Td textAlign="center">
                    {dayjs(job.createdAt).format("DD/MM/YYYY")}
                  </Td>
                  <Td textAlign="center">{job.location}</Td>
                  <Td textAlign="center">{job.type}</Td>
                  <Td textAlign="center">{job.mode}</Td>
                  <Td textAlign="center">{job.experience}</Td>
                  <Td textAlign="center" cursor="pointer">
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      gap="25px"
                    >
                      <Icon
                        as={BiEdit}
                        boxSize={5}
                        color="gray.400"
                        onClick={() => {
                          router.push(`/postedJobs/edit/${job._id}`);
                        }}
                      />
                      <Icon
                        as={BsTrash}
                        boxSize={5}
                        color="red.400"
                        onClick={() => {
                          console.log("delete");
                        }}
                      />
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default JobsTable;
