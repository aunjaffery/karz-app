import {
  Box,
  Flex,
  Text,
  Container,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";

import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

export default function MobileNav({ display }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();

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
            <Box
              _hover={{ color: "blue.300" }}
              onClick={() => navigate(-1)}
              cursor="pointer"
            >
              <AiOutlineLeft size="20px" />
            </Box>
            <Flex align="center">
              <Flex gridColumnGap="1" justify="center" align="center">
                <Text textTransform="capitalize" fontWeight="bold">
                  {getPath()}
                </Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" gridColumnGap="4">
              {display ? <Navs /> : null}
              {colorMode === "light" ? (
                <Box
                  onClick={toggleColorMode}
                  cursor="pointer"
                  color="gray.600"
                >
                  <BsFillMoonFill size="16px" />
                </Box>
              ) : (
                <Box
                  onClick={toggleColorMode}
                  cursor="pointer"
                  color="gray.500"
                >
                  <BsFillSunFill size="16px" />
                </Box>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
const Navs = () => {
  let navPaths = [
    {
      id: 1,
      name: "Expense",
      path: "expense",
    },
    {
      id: 2,
      name: "Loan",
      path: "loan",
    },
    {
      id: 3,
      name: "Stats",
      path: "stats",
    },
    {
      id: 4,
      name: "Clients",
      path: "clients",
    },
  ];
  return (
    <Flex gridColumnGap="4" align="center">
      {navPaths.map((n) => (
        <NavLink to={n.path} end key={n.id}>
          {({ isActive }) => (
            <Box>
              <Text
                color={useColorModeValue("gray.600", "gray.500")}
                _hover={{ color: "blue.400" }}
              >
                {n.name}
              </Text>
              {isActive && (
                <Box
                  w="95%"
                  bg="blue.500"
                  h="2px"
                  borderRadius="3xl"
                  m="0 auto"
                />
              )}
            </Box>
          )}
        </NavLink>
      ))}
      <NavLink to="settings" end>
        {({ isActive }) => (
          <Box
            color={
              isActive ? "blue.400" : useColorModeValue("gray.600", "gray.500")
            }
          >
            <IoSettingsSharp />
          </Box>
        )}
      </NavLink>
    </Flex>
  );
};
