"use client";
import { useAppSelector } from "@/redux/store/hooks";
import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Textarea,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

const EmployeeForm = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
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
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="20px" width="100%">
        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input type="text" placeholder="Phone Number" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Establishment Year</FormLabel>
          <Input type="text" placeholder="EX: 1990" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Company Size</FormLabel>
          <Input type="text" placeholder="EX: 1500" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Website</FormLabel>
          <Input type="email" placeholder="EX: www.google.com" />
        </FormControl>
      </SimpleGrid>
      <FormControl isRequired>
        <FormLabel>Address</FormLabel>
        <Input type="text" placeholder="EX: Egypt,Assiut st.15" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>About The Company</FormLabel>
        <Textarea placeholder="Write About Your Company" />
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
        Update Profile
      </Button>
    </Flex>
  );
};

export default EmployeeForm;
