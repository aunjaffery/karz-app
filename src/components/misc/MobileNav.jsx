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
import { NavLink } from "react-router-dom";
import { RiExchangeFundsLine } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import Ava from "@src/icons/avat.png";
import useBoundStore from "../../store/Store";
import { useQueryClient } from "@tanstack/react-query";

export default function MobileNav() {
  const queryClient = useQueryClient();
  const { toggleColorMode } = useColorMode();

  const { logoutService } = useBoundStore((state) => state);
  const onLogout = async () => {
    queryClient.clear();
    logoutService();
    console.log("Signout Successfull");
  };
  return (
    <>
      <Box>
        <Container maxW="container.xl" h="100%">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Flex
              justify="flex-start"
              align="center"
              _hover={{ color: "blue.300" }}
              color="blue.400"
              gridColumnGap="1"
              onClick={toggleColorMode}
            >
              <Box>
                <RiExchangeFundsLine size="26px" />
              </Box>
              <Text fontWeight="bold" fontSize={{ base: "2xl", md: "3xl" }}>
                Finance
              </Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  _active={{ color: "white" }}
                  color="white"
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
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
