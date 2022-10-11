import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Text,
  Container,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiExchangeFundsLine } from "react-icons/ri";
import { AiOutlineLeft, AiOutlineMenu } from "react-icons/ai";
import Ava from "@src/icons/avat.png";
import useBoundStore from "../../store/Store";
import { useQueryClient } from "@tanstack/react-query";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

export default function MobileNav({ display }) {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation();

  const pathList = [
    "login",
    "signup",
    "loan",
    "expense",
    "stats",
    "clients",
    "transaction",
    "settings",
  ];

  const getPath = () => {
    const sp = pathname.split("/");
    return pathList.includes(sp[1]) ? sp[1] : "Not Found";
  };

  return (
    <>
      <Box>
        <Container maxW="container.xl" h="100%">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            {location.pathname === "/" ? (
              <Box _hover={{ color: "blue.300" }} color="blue.400">
                <RiExchangeFundsLine size="26px" />
              </Box>
            ) : (
              <Box
                _hover={{ color: "blue.300" }}
                onClick={() => navigate(-1)}
                cursor="pointer"
              >
                <AiOutlineLeft size="20px" />
              </Box>
            )}
            <Flex align="center">
              <Flex gridColumnGap="1" justify="center" align="center">
                <Text textTransform="capitalize" fontWeight="bold">
                  {getPath()}
                </Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" gridColumnGap="4">
              {colorMode === "light" ? (
                <Box onClick={toggleColorMode} cursor="pointer">
                  <BsFillMoonFill size="16px" />
                </Box>
              ) : (
                <Box onClick={toggleColorMode} cursor="pointer">
                  <BsFillSunFill size="16px" />
                </Box>
              )}
              {display ? <SideDrawer /> : null}
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
const SideDrawer = () => {
  const queryClient = useQueryClient();
  const { logoutService } = useBoundStore((state) => state);
  const onLogout = async () => {
    queryClient.clear();
    logoutService();
    console.log("Signout Successfull");
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
        _active={{ color: "white" }}
      >
        <AiOutlineMenu size="22" />
      </MenuButton>
      <MenuList
        alignItems={"center"}
        background="bg.100"
        boxShadow="xl"
        borderColor="gray.200"
      >
        <Center h="100px">
          <Image src={Ava} h="auto" maxH="100%" />
        </Center>
        <MenuDivider />
        <NavLink to="expense" style={{ background: "blue" }} end>
          {({ isActive }) => (
            <MenuItem
              color={isActive ? "blue.600" : "gray.700"}
              bg={isActive ? "blue.100" : "none"}
              _hover={{ color: "blue.600", bg: "blue.100" }}
              _focus={{ backgroundColor: "none" }}
            >
              Expense
            </MenuItem>
          )}
        </NavLink>
        <NavLink to="loan" style={{ background: "blue" }} end>
          {({ isActive }) => (
            <MenuItem
              color={isActive ? "blue.600" : "gray.700"}
              bg={isActive ? "blue.100" : "none"}
              _hover={{ color: "blue.600", bg: "blue.100" }}
              _focus={{ backgroundColor: "none" }}
            >
              Loan
            </MenuItem>
          )}
        </NavLink>
        <NavLink to="stats" style={{ background: "blue" }} end>
          {({ isActive }) => (
            <MenuItem
              color={isActive ? "blue.600" : "gray.700"}
              bg={isActive ? "blue.100" : "none"}
              _hover={{ color: "blue.600", bg: "blue.100" }}
              _focus={{ backgroundColor: "none" }}
            >
              Stats
            </MenuItem>
          )}
        </NavLink>
        <NavLink to="clients">
          {({ isActive }) => (
            <MenuItem
              color={isActive ? "blue.600" : "gray.700"}
              bg={isActive ? "blue.100" : "none"}
              _hover={{ color: "blue.600", bg: "blue.100" }}
            >
              Clients
            </MenuItem>
          )}
        </NavLink>
        <NavLink to="settings">
          {({ isActive }) => (
            <MenuItem
              color={isActive ? "blue.600" : "gray.700"}
              bg={isActive ? "blue.100" : "none"}
              _hover={{ color: "blue.600", bg: "blue.100" }}
            >
              Settings
            </MenuItem>
          )}
        </NavLink>
        <MenuItem
          color="gray.700"
          _hover={{ color: "red.600", bg: "red.100" }}
          onClick={onLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
