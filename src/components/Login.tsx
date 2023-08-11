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
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store/hooks";
import { setLoading } from "@/redux/slices/loadingSlice";
type LoginFormTypes = {
  email: string;
  password: string;
};

const loginFormScehma = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(6, "password should be at least 6 characters"),
});

export default function LoginForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormTypes>({
    resolver: zodResolver(loginFormScehma),
  });
  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const onSubmit = async (data: LoginFormTypes) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/users/login", data);
      toast({
        title: res.data.message,
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: error.response.data.message || "something went wrong",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack
          as="form"
          spacing={4}
          w={"full"}
          maxW={"md"}
          mb="20px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading textAlign="center" mb="20px" fontSize={"2xl"}>
            Login in to your account
          </Heading>

          <FormControl
            id="email"
            isRequired
            isInvalid={!!errors.email?.message}
          >
            <FormLabel>Email address</FormLabel>
            <Input
              required
              type="email"
              placeholder="example@example.com"
              {...register("email")}
            />
            <Text color="red.400" fontSize="sm" my="5px">
              {errors.email && errors.email?.message}
            </Text>
          </FormControl>
          <FormControl
            id="password"
            isRequired
            isInvalid={!!errors.password?.message}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="***************"
                {...register("password")}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text color="red.400" fontSize="sm" my="5px">
              {errors.password && errors.password?.message}
            </Text>
          </FormControl>

          <Button
            type="submit"
            w="100%"
            bg="teal.200"
            my="10px"
            isLoading={isSubmitting}
          >
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
