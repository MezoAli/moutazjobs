"use client";
import { Grid, GridItem } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";
import { useState } from "react";
import { useAppSelector } from "@/redux/store/hooks";

const ChildrenLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const isPublicPath =
    pathname === "/auth/login" || pathname === "/auth/register";
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <>
      {isLoading && <Loader />}
      <Grid templateColumns="repeat(12, 1fr)" gap={2}>
        {!isPublicPath && (
          <GridItem
            colSpan={{ base: 12, lg: isExpanded ? 2 : 1 }}
            bg="black"
            color="white"
            height={{ base: "auto", lg: "100vh" }}
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          </GridItem>
        )}

        <GridItem
          colSpan={{
            base: 12,
            lg: isPublicPath ? 12 : isExpanded ? 10 : 11,
          }}
        >
          {children}
        </GridItem>
      </Grid>
    </>
  );
};

export default ChildrenLayout;
