"use client";
import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Button,
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  TableCaption,
  TableContainer,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import { MouseEventHandler, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

interface Experience {
  company: string;
  role: string;
  yearsOfExperince: string;
  id: string;
}

// const skillSchema = z.object({
//   technology: z
//     .string()
//     .trim()
//     .min(3, "Technology should be at least 3 characters"),
//   rating: z.string().trim().min(1, "Rating can't be empty"),
// });

const AddExperienceForm = () => {
  const [experince, setExperince] = useState<Experience[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [yearsOfExperince, setYearsOfExperince] = useState("");
  const toast = useToast();
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<Skill>({
  //     resolver: zodResolver(skillSchema),
  //   });
  const handleAddExperince:
    | MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    if (
      !company ||
      !role ||
      !yearsOfExperince ||
      company.trim() === "" ||
      role.trim() === "" ||
      yearsOfExperince.trim() === ""
    ) {
      toast({
        title: "Please enter valid inputs",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setExperince((experince) => {
      return [...experince, { company, role, yearsOfExperince, id: uuidv4() }];
    });
    setCompany("");
    setRole("");
    setYearsOfExperince("");
  };

  const handleDeleteExperince = (id: string) => {
    setExperince((experince) => {
      return experince.filter((item) => item.id !== id);
    });
  };

  return (
    <>
      <Box textAlign="start" width="100%">
        <Heading as="h3" size="lg" mb="20px" mt="20px" textAlign="start">
          Experience
        </Heading>
      </Box>

      <Flex gap="10px" flexDir="column" w="100%">
        <Flex alignItems="center" justifyContent="space-between" gap="10px">
          <FormControl isRequired>
            <FormLabel>Company</FormLabel>
            <Input
              type="text"
              value={company}
              placeholder="Ex: Mylan Pharma."
              onChange={(e) => setCompany(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Input
              type="text"
              value={role}
              placeholder="Ex: Key Account Manager"
              onChange={(e) => setRole(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Years Of Experience</FormLabel>
            <InputGroup>
              <InputLeftAddon children="Year" />
              <Input
                type="text"
                placeholder="Ex: 1"
                value={yearsOfExperince}
                onChange={(e) => setYearsOfExperince(e.target.value)}
              />
            </InputGroup>
          </FormControl>
        </Flex>
        <Box textAlign="start" width="100%" mb="15px">
          <Button
            bg="black"
            color="white"
            variant="solid"
            width=""
            my="10px"
            _hover={{ bg: "white", color: "black", border: "1px solid black" }}
            onClick={handleAddExperince}
          >
            Add Education
          </Button>
        </Box>
      </Flex>
      {experince.length > 0 && (
        <TableContainer width="100%">
          <Table variant="striped" colorScheme="blackAlpha">
            <TableCaption>Experience</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">Company</Th>
                <Th textAlign="center">Role</Th>
                <Th textAlign="center">Years Of Experience</Th>
                <Th textAlign="center">Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {experince.map((ex) => {
                return (
                  <Tr key={ex.id}>
                    <Td textAlign="center">{ex.company}</Td>
                    <Td textAlign="center">{ex.role}</Td>
                    <Td textAlign="center">{ex.yearsOfExperince}</Td>
                    <Td textAlign="center" cursor="pointer">
                      <Icon
                        as={BsTrash}
                        boxSize={5}
                        color="red.400"
                        onClick={() => handleDeleteExperince(ex.id)}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default AddExperienceForm;
