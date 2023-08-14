"use client";
import { setLoading } from "@/redux/slices/loadingSlice";
import { setCurrentUser } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Textarea,
  SimpleGrid,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useState } from "react";

const EmployeeForm = () => {
  const user = useAppSelector((state) => state.user.user);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber!);
  const [establishmentYear, setEstablishmentYear] = useState(
    user?.establishmentYear!
  );
  const [about, setAbout] = useState(user?.about!);
  const [companySize, setCompanySize] = useState(user?.companySize!);
  const [website, setWebsite] = useState(user?.website!);
  const [address, setAddress] = useState(user?.address!);
  console.log(user);

  const toast = useToast();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dataToBeSet = {
      ...user,
      phoneNumber,
      establishmentYear,
      about,
      companySize,
      website,
      address,
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
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="20px" width="100%">
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
          <FormLabel>Establishment Year</FormLabel>
          <Input
            type="text"
            placeholder="EX: 1990"
            value={establishmentYear}
            onChange={(e) => setEstablishmentYear(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Company Size</FormLabel>
          <Input
            type="text"
            placeholder="EX: 1500"
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Website</FormLabel>
          <Input
            type="text"
            placeholder="EX: www.google.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </FormControl>
      </SimpleGrid>
      <FormControl isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          placeholder="EX: Egypt,Assiut st.15"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>About The Company</FormLabel>
        <Textarea
          placeholder="Write About Your Company"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
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
