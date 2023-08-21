"use client";
import { User } from "@/redux/slices/userSlice";
import {
  Container,
  Heading,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const EmployeeInfo = ({ employee }: { employee: User }) => {
  return (
    <Container maxW="3xl" my="20px">
      <Heading as="h2" fontSize="2xl" my="30px">
        Applicants Info
      </Heading>
      <Flex direction="column" gap="30px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Applicant Name
          </Text>
          <Text>{employee.name}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Email Address
          </Text>
          <Text>{employee.email}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Phone Number
          </Text>
          <Text>{employee.phoneNumber}</Text>
        </Flex>
        <Flex
          justifyContent="flex-start"
          alignItems="flex-start"
          direction="column"
          gap="15px"
        >
          <Text fontWeight="semibold" fontSize="lg">
            Carrier Objective
          </Text>
          <Text>{employee.carrierObjective}</Text>
        </Flex>

        <Flex
          justifyContent="flex-start"
          alignItems="center"
          direction="column"
          gap="15px"
        >
          <Text fontWeight="semibold" fontSize="lg">
            Skills
          </Text>
          {employee?.skills?.length === 0 && (
            <Text>Applicant dosn't post any skills!!</Text>
          )}
          {employee?.skills && employee?.skills?.length > 0 && (
            <TableContainer width="100%">
              <Table variant="striped" colorScheme="blackAlpha">
                <TableCaption>Skills</TableCaption>
                <Thead>
                  <Tr>
                    <Th textAlign="center">Technology</Th>
                    <Th textAlign="center">Rating</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employee?.skills.map((skill) => {
                    return (
                      <Tr key={skill.id}>
                        <Td textAlign="center">{skill.technology}</Td>
                        <Td textAlign="center">{skill.rating}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Flex>
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          direction="column"
          gap="15px"
        >
          <Text fontWeight="semibold" fontSize="lg">
            Education
          </Text>
          {employee?.educations?.length === 0 && (
            <Text>Applicant dosn't post any education!!</Text>
          )}
          {employee?.educations && employee?.educations?.length > 0 && (
            <TableContainer width="100%">
              <Table variant="striped" colorScheme="blackAlpha">
                <TableCaption>Educations</TableCaption>
                <Thead>
                  <Tr>
                    <Th textAlign="center">Qualification</Th>
                    <Th textAlign="center">Institution</Th>
                    <Th textAlign="center">Percentage</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employee?.educations.map((education) => {
                    return (
                      <Tr key={education.id}>
                        <Td textAlign="center">{education.qualification}</Td>
                        <Td textAlign="center">{education.institution}</Td>
                        <Td textAlign="center">{education.percentage}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Flex>
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          direction="column"
          gap="15px"
        >
          <Text fontWeight="semibold" fontSize="lg">
            Experience
          </Text>
          {employee?.experince?.length === 0 && (
            <Text>Applicant dosn't have any experience!!</Text>
          )}
          {employee?.experince && employee?.experince?.length > 0 && (
            <TableContainer width="100%">
              <Table variant="striped" colorScheme="blackAlpha">
                <TableCaption>Experience</TableCaption>
                <Thead>
                  <Tr>
                    <Th textAlign="center">Company</Th>
                    <Th textAlign="center">Role</Th>
                    <Th textAlign="center">Years Of Experience</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employee?.experince.map((ex) => {
                    return (
                      <Tr key={ex.id}>
                        <Td textAlign="center">{ex.company}</Td>
                        <Td textAlign="center">{ex.role}</Td>
                        <Td textAlign="center">{ex.yearsOfExperince}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default EmployeeInfo;
