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
  useToast,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store/hooks";
import { setLoading } from "@/redux/slices/loadingSlice";
import axios from "axios";
import { useState } from "react";
import ApplicationsModal from "./ApplicationsModal";

interface JobTableProps {
  jobs: Job[];
}
const JobsTable = ({ jobs }: JobTableProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | undefined>();
  const handleDeleteJob = async (jobId: string) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`/api/jobs/${jobId}`);
      toast({
        title: res.data.message,
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: error.response.data.message || "something went wrong",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // router.refresh();
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      {isOpen && (
        <ApplicationsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          job={selectedJob!}
        />
      )}
      {jobs.length === 0 ? (
        <Text textAlign="center" fontSize="2xl" my="30px">
          You Don't Have any Posted Jobs
        </Text>
      ) : (
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
                            handleDeleteJob(job._id);
                          }}
                        />
                        <Icon
                          title="applications"
                          as={LuClipboardList}
                          boxSize={5}
                          color="blue.400"
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedJob(job);
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
      )}
    </>
  );
};

export default JobsTable;
