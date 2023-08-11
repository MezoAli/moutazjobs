"use client";
import { extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import Loader from "@/components/Loader";

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

export function Providers({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname();
  // const [isExpanded, setIsExpanded] = useState(true);
  // const isPublicPath =
  //   pathname === "/auth/login" || pathname === "/auth/register";
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          {children}
          {/* <Loader />
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
                <Sidebar
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                />
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
          </Grid> */}
        </Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
