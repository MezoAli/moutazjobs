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
  SimpleGrid,
} from "@chakra-ui/react";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { Education } from "./EmployeeForm";
import { User } from "@/redux/slices/userSlice";

interface EducationProps {
  educations: Education[];
  seteducations: Dispatch<SetStateAction<Education[]>>;
  user: User;
}

const AddEducationForm = ({
  educations,
  seteducations,
  user,
}: EducationProps) => {
  const [qualification, setQualification] = useState("");
  const [institution, setInstitution] = useState("");
  const [percentage, setPercentage] = useState("");
  const toast = useToast();

  const handleAddEducation:
    | MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    if (
      !qualification ||
      !institution ||
      !percentage ||
      percentage.trim() === "" ||
      qualification.trim() === "" ||
      institution.trim() === ""
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
    seteducations((educations) => {
      return [
        ...educations,
        { qualification, institution, percentage, id: uuidv4() },
      ];
    });
    setQualification("");
    setInstitution("");
    setPercentage("");
  };

  const handleDeleteEducation = (id: string) => {
    seteducations((educations) => {
      return educations.filter((item) => item.id !== id);
    });
  };

  return (
    <>
      <Box textAlign="start" width="100%">
        <Heading as="h3" size="lg" mb="20px" mt="20px" textAlign="start">
          Education
        </Heading>
      </Box>

      <Flex gap="10px" flexDir="column" w="100%">
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing="20px" width="100%">
          <FormControl>
            <FormLabel>Qualification</FormLabel>
            <Input
              type="text"
              value={qualification}
              placeholder="Ex: Pharmacy"
              onChange={(e) => setQualification(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Institution</FormLabel>
            <Input
              type="text"
              value={institution}
              placeholder="Ex: Harvard University"
              onChange={(e) => setInstitution(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Percentage</FormLabel>
            <InputGroup>
              <InputLeftAddon children="%" />
              <Input
                type="text"
                placeholder="Out of 100%"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
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
            onClick={handleAddEducation}
          >
            Add Education
          </Button>
        </Box>
      </Flex>
      {educations?.length > 0 && (
        <TableContainer width="100%">
          <Table variant="striped" colorScheme="blackAlpha">
            <TableCaption>Educations</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">Qualification</Th>
                <Th textAlign="center">Institution</Th>
                <Th textAlign="center">Percentage</Th>
                <Th textAlign="center">Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {educations.map((education) => {
                return (
                  <Tr key={education.id}>
                    <Td textAlign="center">{education.qualification}</Td>
                    <Td textAlign="center">{education.institution}</Td>
                    <Td textAlign="center">{education.percentage}</Td>
                    <Td textAlign="center" cursor="pointer">
                      <Icon
                        as={BsTrash}
                        boxSize={5}
                        color="red.400"
                        onClick={() => handleDeleteEducation(education.id)}
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

export default AddEducationForm;
