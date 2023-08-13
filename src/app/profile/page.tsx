"use client";
import EmployeeForm from "@/components/EmployeeForm";
import EmployerForm from "@/components/EmployerForm";
import { useAppSelector } from "@/redux/store/hooks";
import { Button } from "@chakra-ui/react";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <>
      {user?.employmentType === "Employer" ? (
        <EmployerForm />
      ) : (
        <EmployeeForm />
      )}
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
    </>
  );
};

export default ProfilePage;
