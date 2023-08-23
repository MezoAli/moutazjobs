import RegisterForm from "@/components/Register";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "MoutazJobs | Registration Page",
  description: "Registration Page",
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
