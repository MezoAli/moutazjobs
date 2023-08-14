"use client";
import { useAppSelector } from "@/redux/store/hooks";
import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Textarea,
  Button,
  Divider,
} from "@chakra-ui/react";
import AddSkillsForm from "./AddSkillsForm";
import AddEducationForm from "./AddEducationForm";
import AddExperienceForm from "./AddExperienceForm";
import { FormEvent, useState } from "react";

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
  const [educations, seteducations] = useState<Education[]>([]);
  const [experince, setExperince] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [carrierObjective, setCarrierObjective] = useState("");
  console.log(user);

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dataToBeSet = {
      ...user,
      educations,
      experince,
      skills,
      phoneNumber,
      carrierObjective,
    };
    console.log(dataToBeSet);
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
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Carrier Objective</FormLabel>
        <Textarea
          placeholder="Write Your Carrier Objective"
          value={carrierObjective}
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
