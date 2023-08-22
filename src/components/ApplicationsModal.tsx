"use client";
import { Job } from "@/app/postedJobs/page";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useAppDispatch } from "@/redux/store/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Select,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ChangeEvent,
} from "react";

interface ApplicationModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  job: Job;
}
const ApplicationsModal = ({
  isOpen,
  setIsOpen,
  job,
}: ApplicationModalProps) => {
  const [applications, setApplications] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const getJobApplications = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/applications?jobId=${job._id}`);
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
    getJobApplications();
  }, []);

  const handleStatusChange = async (
    e: ChangeEvent<HTMLSelectElement>,
    appId: string
  ) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`/api/applications?appId=${appId}`, {
        status: e.target.value,
      });
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
      dispatch(setLoading(false));
    }
  };
  return (
    <Modal isOpen={isOpen} size="2xl" onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Applications for {job?.title}</ModalHeader>
        <ModalCloseButton />
        {applications.length === 0 ? (
          <Text textAlign="center" fontSize="lg" fontWeight="semibold">
            You Don't Have Applicants For That Job Yet
          </Text>
        ) : (
          <ModalBody>
            <TableContainer width="100%" my="30px">
              <Table variant="striped" colorScheme="blackAlpha">
                <TableCaption>Applicants</TableCaption>
                <Thead>
                  <Tr>
                    <Th textAlign="center">Applicant Id</Th>
                    <Th textAlign="center">Applicant Name</Th>
                    <Th textAlign="center">Email</Th>
                    <Th textAlign="center">Applied on</Th>
                    <Th textAlign="center">Status</Th>
                    <Th textAlign="center">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {applications.map((app) => {
                    return (
                      <Tr key={app._id}>
                        <Td textAlign="center">
                          <Button
                            as={Link}
                            variant="link"
                            href={`/employeeInfo/${app?.user?._id}`}
                          >
                            {app?.user?._id}
                          </Button>
                        </Td>
                        <Td textAlign="center">{app?.user?.name}</Td>
                        <Td textAlign="center">{app?.user?.email}</Td>
                        <Td textAlign="center">
                          {dayjs(app?.createdAt).format("DD/MM/YYYY")}
                        </Td>
                        <Td textAlign="center">
                          <Select
                            width="150px"
                            placeholder="Select option"
                            defaultValue={app?.status}
                            onChange={(e) => handleStatusChange(e, app._id)}
                          >
                            <option value="pending">Pending</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                          </Select>
                        </Td>
                        <Td textAlign="center" cursor="pointer">
                          <Flex
                            justifyContent="center"
                            alignItems="center"
                            gap="25px"
                          >
                            <Button
                              as={Link}
                              variant="link"
                              href={`/employeeInfo/${app?.user?._id}`}
                            >
                              View
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        )}

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ApplicationsModal;
function getUserApplications() {
  throw new Error("Function not implemented.");
}
