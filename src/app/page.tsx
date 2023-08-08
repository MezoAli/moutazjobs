import Test from "@/components/Text";
import axios from "axios";
import { cookies } from "next/headers";

const getUser = async () => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const res = await axios.get("http://localhost:3000/api/users/currentUser", {
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
