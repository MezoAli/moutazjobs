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
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { Skill } from "./EmployeeForm";
import { User } from "@/redux/slices/userSlice";

interface SkillProps {
  skills: Skill[];
  setSkills: Dispatch<SetStateAction<Skill[]>>;
  user: User;
}

const AddSkillsForm = ({ skills, setSkills, user }: SkillProps) => {
  const [technology, setTechnology] = useState("");
  const [rating, setRating] = useState("");
  const toast = useToast();

  const handleAddSkill:
    | MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    if (
      !technology ||
      !rating ||
      technology.trim() === "" ||
      rating.trim() === ""
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
    setSkills((items) => {
      return [...items, { technology, rating, id: uuidv4() }];
    });
    setRating("");
    setTechnology("");
  };

  const handleDeleteSkill = (id: string) => {
    setSkills((items) => {
      return skills.filter((item) => item.id !== id);
    });
  };

  return (
    <>
      <Box textAlign="start" width="100%">
        <Heading as="h3" size="lg" mb="20px" mt="20px" textAlign="start">
          Skills
        </Heading>
      </Box>

      <Flex gap="10px" flexDir="column" w="100%">
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="20px" width="100%">
          <FormControl>
            <FormLabel>Technology</FormLabel>
            <Input
              type="text"
              value={technology}
              placeholder="Ex: HTML"
              onChange={(e) => setTechnology(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Rating</FormLabel>
            <InputGroup>
              <InputLeftAddon children="Out of 10" />
              <Input
                type="text"
                placeholder="Ex: 7"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>
        <Box textAlign="start" width="100%" mb="15px">
          <Button
            bg="black"
            color="white"
            variant="solid"
            my="10px"
            _hover={{ bg: "white", color: "black", border: "1px solid black" }}
            onClick={handleAddSkill}
          >
            Add Skill
          </Button>
        </Box>
      </Flex>
      {skills.length > 0 && (
        <TableContainer width="100%">
          <Table variant="striped" colorScheme="blackAlpha">
            <TableCaption>Skills</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">Technology</Th>
                <Th textAlign="center">Rating</Th>
                <Th textAlign="center">Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {skills.map((skill) => {
                return (
                  <Tr key={skill.id}>
                    <Td textAlign="center">{skill.technology}</Td>
                    <Td textAlign="center">{skill.rating}</Td>
                    <Td textAlign="center" cursor="pointer">
                      <Icon
                        as={BsTrash}
                        boxSize={5}
                        color="red.400"
                        onClick={() => handleDeleteSkill(skill.id)}
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

export default AddSkillsForm;
