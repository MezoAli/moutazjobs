"use client";
import { User } from "@/redux/slices/userSlice";
import { Container, Heading, Text, Flex, Divider } from "@chakra-ui/react";

const CompanyInfo = ({ company }: { company: User }) => {
  return (
    <Container maxW="3xl" my="20px">
      <Heading as="h2" fontSize="2xl" my="30px">
        Company Info
      </Heading>
      <Flex direction="column" gap="30px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Company Name
          </Text>
          <Text>{company.name}</Text>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Address
          </Text>
          <Text>{company.address}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Company Size
          </Text>
          <Text>{company.companySize}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Establishment Year
          </Text>
          <Text>{company.establishmentYear}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Phone Number
          </Text>
          <Text>{company.phoneNumber}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Email Address
          </Text>
          <Text>{company.email}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold" fontSize="lg">
            Visit Our Website
          </Text>
          <Text>{company.website}</Text>
        </Flex>
        <Flex
          justifyContent="flex-start"
          alignItems="flex-start"
          width="100%"
          direction="column"
          gap="12px"
        >
          <Text fontWeight="semibold" fontSize="lg">
            About Us
          </Text>
          <Divider />
          <Text>{company.about}</Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default CompanyInfo;
