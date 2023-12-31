"use client";
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
  companyName: string;
};

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
const AddNewJobForm = () => {
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
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();

  const onSubmit = async (data: NewJobFormType) => {
    try {
      dispatch(setLoading(true));
      data.userId = user._id;
      data.companyName = user.name;
      const res = await axios.post("/api/jobs", data);
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
        <Input type="text" placeholder="Job Title" {...register("title")} />
        <Text color="red.400" fontSize="sm" my="5px">
          {errors.title && errors.title?.message}
        </Text>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Enter Your Job Description Here"
          {...register("description")}
        />
        <Text color="red.400" fontSize="sm" my="5px">
          {errors.description && errors.description?.message}
        </Text>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Type</FormLabel>
        <Select placeholder="Select option">
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
        />
        <Text color="red.400" fontSize="sm" my="5px">
          {errors.experience && errors.experience?.message}
        </Text>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Mode</FormLabel>
        <Select placeholder="Select option">
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
        Post Job
      </Button>
    </Flex>
  );
};

export default AddNewJobForm;
