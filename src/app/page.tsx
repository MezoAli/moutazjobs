import Test from "@/components/Text";
import axios from "axios";
import { cookies } from "next/headers";

const getUser = async () => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const res = await axios.get(`${process.env.SITE_URL}/api/users/currentUser`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  return res.data.data;
};

export default async function Home() {
  const user: any = await getUser();

  return <Test user={user} />;
}
