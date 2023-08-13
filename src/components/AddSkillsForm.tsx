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

interface Skill {
  technology: string;
  rating: string;
  id: string;
}

// const skillSchema = z.object({
//   technology: z
//     .string()
//     .trim()
//     .min(3, "Technology should be at least 3 characters"),
//   rating: z.string().trim().min(1, "Rating can't be empty"),
// });

const AddSkillsForm = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [technology, setTechnology] = useState("");
  const [rating, setRating] = useState("");
  const toast = useToast();
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<Skill>({
  //     resolver: zodResolver(skillSchema),
  //   });
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
    setSkills((skills) => {
      return [...skills, { technology, rating, id: uuidv4() }];
    });
    setRating("");
    setTechnology("");
  };

  const handleDeleteSkill = (id: string) => {
    setSkills((skills) => {
      return skills.filter((item) => item.id !== id);
    });
  };

  console.log(skills);

  return (
    <>
      <Box textAlign="start" width="100%">
        <Heading as="h3" size="lg" mb="20px" mt="20px" textAlign="start">
          Skills
        </Heading>
      </Box>

      <Flex gap="10px" flexDir="column" w="100%">
        <Flex alignItems="center" justifyContent="space-between" gap="10px">
          <FormControl isRequired>
            <FormLabel>Technology</FormLabel>
            <Input
              type="text"
              value={technology}
              placeholder="Ex: HTML"
              onChange={(e) => setTechnology(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
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
        </Flex>
        <Box textAlign="start" width="100%" mb="15px">
          <Button
            bg="black"
            color="white"
            variant="solid"
            width=""
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
