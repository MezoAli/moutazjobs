import LoginForm from "@/components/Login";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "MoutazJobs | Login Page",
  description: "login page",
};

const Loginpage = () => {
  return <LoginForm />;
};

export default Loginpage;
