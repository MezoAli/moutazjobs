"use client";
import React from "react";
import { Skeleton, SimpleGrid } from "@chakra-ui/react";

const Loading = () => {
  return (
    <SimpleGrid minChildWidth="250px" spacing="40px">
      <Skeleton height="250px"></Skeleton>
      <Skeleton height="250px"></Skeleton>
      <Skeleton height="250px"></Skeleton>
      <Skeleton height="250px"></Skeleton>
      <Skeleton height="250px"></Skeleton>
      <Skeleton height="250px"></Skeleton>
    </SimpleGrid>
  );
};

export default Loading;
