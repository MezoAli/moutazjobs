"use client";
import { extendTheme } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
const theme = extendTheme({
  // colors: {
  //   brand: {
  //     100: "#f7fafc",
  //     900: "#1a202c",
  //   },
  //   mezo: {
  //     100: "#f7fa",
  //   },
  // },
  // components: {},
});

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPath =
    pathname === "/auth/login" || pathname === "/auth/register";
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Grid templateColumns="repeat(6, 1fr)" gap={2}>
          {!isPublicPath && (
            <GridItem
              colSpan={{ base: 6, lg: 1 }}
              bg="black"
              color="white"
              height={{ base: "auto", lg: "100vh" }}
            >
              <Sidebar />
            </GridItem>
          )}

          <GridItem colSpan={{ base: 6, lg: isPublicPath ? 6 : 5 }}>
            {children}
          </GridItem>
        </Grid>
      </ChakraProvider>
    </CacheProvider>
  );
}
