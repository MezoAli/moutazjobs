"use client";
import { Skeleton, Container, SkeletonText } from "@chakra-ui/react";
const LoadingPage = () => {
  return (
    <Container maxW="3xl">
      <SkeletonText mt="10" noOfLines={12} spacing="7" skeletonHeight="5" />
    </Container>
  );
};

export default LoadingPage;
