import CompanyInfo from "@/components/CompanyInfo";
import axios from "axios";

const getUser = async (companyId: string) => {
  const res = await axios.get(`${process.env.SITE_URL}/api/users/${companyId}`);
  return res.data.data;
};

export async function generateMetadata({
  params: { companyId },
}: {
  params: { companyId: string };
}) {
  const res = await axios.get(`${process.env.SITE_URL}/api/users/${companyId}`);
  return {
    title: `Company : ${res.data.data.name}`,
    description: res.data.data.about,
  };
}

const CompanyPage = async ({
  params: { companyId },
}: {
  params: { companyId: string };
}) => {
  const company = await getUser(companyId);

  return <CompanyInfo company={company} />;
};

export default CompanyPage;
