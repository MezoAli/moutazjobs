import { Text, Flex, Icon, Button, Center } from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import { CiUser, CiSettings } from "react-icons/ci";
import { BsCardList } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
interface SidebarProps {
  isExpanded: Boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}
const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>({});
  const getUser = async () => {
    const response = await axios.get("/api/users/currentUser");
    setUser(response.data.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const menus = [
    {
      name: "Home",
      icon: BiHome,
      path: "/",
      title: "Home Page",
    },
    {
      name: "Profile",
      icon: CiUser,
      path: "/profile",
      title: "Profile Page",
    },
    {
      name: "Applications",
      icon: BsCardList,
      path: "/applications",
      title: "Applications Page",
    },
    {
      name: "Settings",
      icon: CiSettings,
      path: "/settings",
      title: "Settings Page",
    },
    {
      name: "Saved",
      icon: AiOutlineSave,
      path: "/saved",
      title: "Saved Page",
    },
  ];
  return (
    <>
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        {isExpanded && (
          <Text fontSize="xl" py={2}>
            Moutaz's Jobs
          </Text>
        )}
        {isExpanded && (
          <Icon
            as={AiOutlineClose}
            boxSize={5}
            cursor="pointer"
            marginRight="10px"
            onClick={() => setIsExpanded(false)}
          />
        )}
        {!isExpanded && (
          <Center w="100%" py="11px">
            <Icon
              as={RxHamburgerMenu}
              boxSize={6}
              cursor="pointer"
              onClick={() => setIsExpanded(true)}
            />
          </Center>
        )}
      </Flex>

      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        {menus.map((menu) => {
          const isActive = pathname === menu.path;
          return (
            <Flex
              as={Link}
              href={menu.path}
              justifyContent="space-between"
              alignItems="center"
              gap={1}
              width="100%"
              _hover={{ background: "white", color: "black" }}
              padding="5px"
              borderRadius="5px"
              background={isActive ? "white" : "auto"}
              color={isActive ? "black" : "auto"}
              title={menu.title}
            >
              <Icon as={menu.icon} boxSize={5} />
              {isExpanded && (
                <Text fontWeight={isActive ? "semibold" : "auto"}>
                  {menu.name}
                </Text>
              )}
            </Flex>
          );
        })}
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        gap={3}
        cursor="pointer"
        marginBottom="10px"
        _hover={{ background: "white", color: "black" }}
        padding="5px"
        borderRadius="5px"
        title="Log Out"
      >
        <Icon as={FiLogOut} boxSize={5} cursor="pointer" />
        {isExpanded && (
          <Flex
            flexDir="column"
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="semibold">{user?.name}</Text>
            <Text fontWeight="semibold">{user.email}</Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Sidebar;
