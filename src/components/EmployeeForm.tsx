"use client";
import { useAppSelector } from "@/redux/store/hooks";
import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Textarea,
  Container,
  Heading,
  Divider,
  Button,
} from "@chakra-ui/react";
import AddSkillsForm from "./AddSkillsForm";
import AddEducationForm from "./AddEducationForm";
import AddExperienceForm from "./AddExperienceForm";
const EmployeeForm = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <Container maxW="3xl">
      <Heading as="h2" size="xl" mb="20px" mt="20px">
        Profile
      </Heading>
      <Divider mb="10px" />
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        gap="20px"
        as="form"
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
          <Input type="text" placeholder="Phone Number" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Carrier Objective</FormLabel>
          <Textarea placeholder="Write Your Carrier Objective" />
        </FormControl>
        {/* Skill section */}
        <AddSkillsForm />
        <Divider />
        {/* Education section */}
        <AddEducationForm />
        <Divider />
        {/* Experince sextion */}
        <AddExperienceForm />
        <Divider />
        <Button
          my="20px"
          width="100%"
          bg="black"
          color="white"
          variant="solid"
          _hover={{ bg: "white", color: "black", border: "1px solid black" }}
        >
          Update Profile
        </Button>
      </Flex>
    </Container>
  );
};

export default EmployeeForm;
