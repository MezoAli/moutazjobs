"use client";
import { Job } from "@/app/postedJobs/page";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Text,
  useToast,
  Container,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type NewJobFormType = {
  title: string;
  description: string;
  type: string;
  salary: string;
  location: string;
  experience: string;
  mode: string;
  userId: string;
};

interface EditJobProps {
  job: Job;
}

const addNewJobSchema = z.object({
  title: z.string().trim().min(6, "Title should be at least 6 characters"),
  description: z
    .string()
    .trim()
    .min(20, "Description should be at least 20 characters"),
  type: z.string(),
  salary: z.string().trim(),
  location: z
    .string()
    .trim()
    .min(6, "Location should be at least 6 characters"),
  experience: z.string().trim(),
  mode: z.string(),
});
const EditJobForm = ({ job }: EditJobProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewJobFormType>({
    resolver: zodResolver(addNewJobSchema),
  });

  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  const onSubmit = async (data: NewJobFormType) => {
    try {
      dispatch(setLoading(true));
      data.userId = user?._id;
      const res = await axios.put(`/api/jobs/${job._id}`, data);
      toast({
        title: res.data.message,
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/postedJobs");
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
      reset();
    }
  };
  return (
    <Container maxW="3xl">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="lg" mb="20px" mt="20px">
          Edit Job
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
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        gap="20px"
        my="20px"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            placeholder="Job Title"
            {...register("title")}
            defaultValue={job?.title}
          />
          <Text color="red.400" fontSize="sm" my="5px">
            {errors.title && errors.title?.message}
          </Text>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter Your Job Description Here"
            {...register("description")}
            defaultValue={job?.description}
          />
          <Text color="red.400" fontSize="sm" my="5px">
            {errors.description && errors.description?.message}
          </Text>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Type</FormLabel>
          <Select placeholder="Select option" defaultValue={job?.type}>
            <option value="full-time" {...register("type")}>
              Full Time
            </option>
            <option value="part-time" {...register("type")}>
              Part Time
            </option>
            <option value="contract" {...register("type")}>
              Contract
            </option>
          </Select>
          <Text color="red.400" fontSize="sm" my="5px">
            {errors.type && errors.type?.message}
          </Text>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            placeholder="Job location"
            {...register("location")}
            defaultValue={job?.location}
          />
          <Text color="red.400" fontSize="sm" my="5px">
            {errors.location && errors.location?.message}
          </Text>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Experience</FormLabel>
          <Input
            type="text"
            placeholder="No. Of Years Of Experience Required"
            {...register("experience")}
            defaultValue={job?.experience}
          />
          <Text color="red.400" fontSize="sm" my="5px">
            {errors.experience && errors.experience?.message}
          </Text>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Mode</FormLabel>
          <Select placeholder="Select option" defaultValue={job?.mode}>
            <option value="office" {...register("mode")}>
              Office
            </option>
            <option value="online" {...register("mode")}>
              Online
            </option>
            <option value="hybird" {...register("mode")}>
              Hybird
            </option>
          </Select>
          <Text color="red.400" fontSize="sm" my="5px">
            {errors.mode && errors.mode?.message}
          </Text>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Salary</FormLabel>
          <Input
            type="text"
            placeholder="Ex: 10000/year or Confidential"
            {...register("salary")}
            defaultValue={job?.salary}
          />
          <Text color="red.400" fontSize="sm" my="5px">
            {errors.salary && errors.salary?.message}
          </Text>
        </FormControl>
        <Button
          my="20px"
          width="100%"
          bg="black"
          color="white"
          variant="solid"
          _hover={{ bg: "white", color: "black", border: "1px solid black" }}
          type="submit"
        >
          Update Job
        </Button>
      </Flex>
    </Container>
  );
};

export default EditJobForm;
