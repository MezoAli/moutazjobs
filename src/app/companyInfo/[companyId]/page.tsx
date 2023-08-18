import CompanyInfo from "@/components/CompanyInfo";
import axios from "axios";

const getUser = async (companyId: string) => {
  const res = await axios.get(`${process.env.SITE_URL}/api/users/${companyId}`);
  return res.data.data;
};

const CompanyPage = async ({
  params: { companyId },
}: {
  params: { companyId: string };
}) => {
  const company = await getUser(companyId);

  return <CompanyInfo company={company} />;
};

export default CompanyPage;
