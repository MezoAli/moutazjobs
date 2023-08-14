"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Textarea,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import AddSkillsForm from "./AddSkillsForm";
import AddEducationForm from "./AddEducationForm";
import AddExperienceForm from "./AddExperienceForm";
import { FormEvent, useState } from "react";
import { setLoading } from "@/redux/slices/loadingSlice";
import axios from "axios";
import { setCurrentUser } from "@/redux/slices/userSlice";

export interface Education {
  qualification: string;
  institution: string;
  percentage: string;
  id: string;
}

export interface Experience {
  company: string;
  role: string;
  yearsOfExperince: string;
  id: string;
}

export interface Skill {
  technology: string;
  rating: string;
  id: string;
}
const EmployeeForm = () => {
  const user = useAppSelector((state) => state.user.user);

  const [educations, seteducations] = useState<Education[]>(user?.educations!);
  const [experince, setExperince] = useState<Experience[]>(user?.experince!);
  const [skills, setSkills] = useState<Skill[]>(user?.skills!);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber!);
  const [carrierObjective, setCarrierObjective] = useState(
    user?.carrierObjective!
  );
  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dataToBeSet = {
      ...user,
      educations,
      experince,
      skills,
      phoneNumber,
      carrierObjective,
    };
    try {
      dispatch(setLoading(true));
      const res = await axios.put("/api/users", dataToBeSet);
      dispatch(setCurrentUser(res.data.data));
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
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      gap="20px"
      as="form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Name"
          defaultValue={user?.name as string}
          isDisabled
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="Email address"
          defaultValue={user?.email as string}
          isDisabled
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="text"
          placeholder="Phone Number"
          value={user?.phoneNumber ? user?.phoneNumber : phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Carrier Objective</FormLabel>
        <Textarea
          placeholder="Write Your Carrier Objective"
          value={
            user?.carrierObjective ? user?.carrierObjective : carrierObjective
          }
          onChange={(e) => setCarrierObjective(e.target.value)}
        />
      </FormControl>
      {/* Skill section */}
      <AddSkillsForm skills={skills} setSkills={setSkills} user={user} />
      <Divider />
      {/* Education section */}
      <AddEducationForm
        educations={educations}
        seteducations={seteducations}
        user={user}
      />
      <Divider />
      {/* Experince sextion */}
      <AddExperienceForm
        experince={experince}
        setExperince={setExperince}
        user={user}
      />
      <Divider />
      <Button
        my="20px"
        width="100%"
        bg="black"
        color="white"
        variant="solid"
        _hover={{ bg: "white", color: "black", border: "1px solid black" }}
        type="submit"
      >
        Update Profile
      </Button>
    </Flex>
  );
};

export default EmployeeForm;
