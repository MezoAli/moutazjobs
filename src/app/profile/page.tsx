"use client";
import EmployeeForm from "@/components/EmployeeForm";
import EmployerForm from "@/components/EmployerForm";
import { useAppSelector } from "@/redux/store/hooks";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <>
      {user?.employmentType === "Employer" ? (
        <EmployerForm />
      ) : (
        <EmployeeForm />
      )}
    </>
  );
};

export default ProfilePage;
