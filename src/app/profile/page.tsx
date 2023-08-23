"use client";
import EmployeeForm from "@/components/EmployeeForm";
import EmployerForm from "@/components/EmployerForm";
import { useAppSelector } from "@/redux/store/hooks";
import { Heading, Divider, Container } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile Page",
  description: "Edit Profile Page",
};

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <Container maxW="3xl">
      <Heading as="h2" size="xl" mb="20px" mt="20px">
        Profile
      </Heading>
      <Divider mb="10px" />
      {user?.employmentType === "Employer" ? (
        <EmployerForm />
      ) : (
        <EmployeeForm />
      )}
    </Container>
  );
};

export default ProfilePage;
