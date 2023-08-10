"use client";
// import axios from "axios";
// import { useState, useEffect } from "react";
import { Avatar } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
const Test = ({ user }: { user: any }) => {
  // const [user, setUser] = useState<any>(null);
  // const getUser = async () => {
  //   const res = await axios.get("/api/users/currentUser");
  //   console.log(res.data);
  //   setUser(res.data.data);
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
  // console.log(user);
  return (
    <Box bg="black" color="white">
      <h1>Moutaz Jobs</h1>

      <Avatar name={user.name} src="https://bit.ly/broken-link" />
      <Text>Current User : {user.email}</Text>
    </Box>
  );
};

export default Test;
