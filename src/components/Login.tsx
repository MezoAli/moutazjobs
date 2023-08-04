"use client";

import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";

export default function LoginForm() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack as="form" spacing={4} w={"full"} maxW={"md"} mb="20px">
          <Heading textAlign="center" mb="20px" fontSize={"2xl"}>
            Login in to your account
          </Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input required type="email" placeholder="example@example.com" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input required type="password" placeholder="***************" />
          </FormControl>
          <Button type="submit" w="100%" bg="teal.200" my="10px">
            Log In
          </Button>
          <Flex justifyContent="center" alignItems="center" gap="10px">
            <Text>Don't Have an Account ? </Text>
            <Button variant="link" colorScheme="teal">
              <Link href="/auth/register">Register</Link>
            </Button>
          </Flex>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
