import EmployeeInfo from "@/components/EmployeeInfo";
import axios from "axios";

const getUser = async (employeeId: string) => {
  const res = await axios.get(
    `${process.env.SITE_URL}/api/users/${employeeId}`
  );
  return res.data.data;
};

const EmployeePage = async ({
  params: { employeeId },
}: {
  params: { employeeId: string };
}) => {
  const employee = await getUser(employeeId);

  return <EmployeeInfo employee={employee} />;
};

export default EmployeePage;
