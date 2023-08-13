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
} from "@chakra-ui/react";
import AddSkillsForm from "./AddSkillsForm";
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
        {/* Education section */}
      </Flex>
    </Container>
  );
};

export default EmployeeForm;
