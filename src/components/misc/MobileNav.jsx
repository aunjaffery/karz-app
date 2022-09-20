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
import { HiUsers } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";

export default function MobileNav() {
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();
  const { pathname } = useLocation();

  const getPath = () => {
    const sp = pathname.split("/");
    return sp[1] ? sp[1] : "home";
  };

  return (
    <>
      <Box>
        <Container maxW="container.xl" h="100%">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            {location.pathname === "/" ? (
              <Box
                _hover={{ color: "blue.300" }}
                color="blue.400"
                onClick={toggleColorMode}
              >
                <RiExchangeFundsLine size="26px" />
              </Box>
            ) : (
              <Box
                _hover={{ color: "blue.300" }}
                color="blue.400"
                onClick={() => navigate(-1)}
              >
                <AiOutlineLeft size="20px" />
              </Box>
            )}
            <Flex align="center" mr="2">
              <Flex
                gridColumnGap="1"
                justify="center"
                align="center"
                color="blue.400"
              >
                {getPath() === "clients" ? (
                  <HiUsers style={{ marginBottom: "3px" }} size="17px" />
                ) : getPath() === "transaction" ? (
                  <BiTransfer style={{ marginBottom: "2px" }} size="17px" />
                ) : (
                  <AiFillHome style={{ marginBottom: "4px" }} size="17px" />
                )}
                <Text textTransform="capitalize">{getPath()}</Text>
              </Flex>
            </Flex>
            <Flex alignItems="center">
              <SideDrawer />
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

const SideDrawer = () => {
  const { toggleColorMode } = useColorMode();
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
        color="blue.400"
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
        <NavLink to="/" style={{ background: "blue" }}>
          {({ isActive }) => (
            <MenuItem
              color={isActive ? "blue.600" : "gray.700"}
              bg={isActive ? "blue.100" : "none"}
              _hover={{ color: "blue.600", bg: "blue.100" }}
              _focus={{ backgroundColor: "none" }}
            >
              Transactions
            </MenuItem>
          )}
        </NavLink>
        <NavLink to="/clients">
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
        <MenuItem
          color={"blue.700"}
          _hover={{ color: "blue.600", bg: "blue.100" }}
          _focus={{ backgroundColor: "none" }}
          onClick={toggleColorMode}
        >
          Dark
        </MenuItem>
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
