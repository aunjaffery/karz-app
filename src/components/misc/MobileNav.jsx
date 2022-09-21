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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiExchangeFundsLine } from "react-icons/ri";
import {
  AiFillCheckCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineLeft,
  AiOutlineMenu,
  AiOutlineQuestion,
} from "react-icons/ai";
import { BiRedo } from "react-icons/bi";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import Ava from "@src/icons/avat.png";
import useBoundStore from "../../store/Store";
import { useQueryClient } from "@tanstack/react-query";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

export default function MobileNav({ display }) {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation();

  const getPath = () => {
    const sp = pathname.split("/");
    return sp[1] ? sp[1] : "home";
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
                color="blue.400"
                onClick={() => navigate(-1)}
                cursor="pointer"
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
                <Text textTransform="capitalize" fontWeight="bold">
                  {getPath()}
                </Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" gridColumnGap="4">
              <GuidePopup />
              {colorMode === "light" ? (
                <Box
                  color="blue.400"
                  onClick={toggleColorMode}
                  cursor="pointer"
                >
                  <BsFillMoonFill size="16px" />
                </Box>
              ) : (
                <Box
                  color="blue.400"
                  onClick={toggleColorMode}
                  cursor="pointer"
                >
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
const GuidePopup = () => {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Box color="blue.400" cursor="pointer">
          <AiOutlineQuestion size="16px" />
        </Box>
      </PopoverTrigger>
      <PopoverContent w="100%">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Guide</PopoverHeader>
        <PopoverBody>
          <Box minW="200px" my="1">
            <Flex justify="flex-start" align="center" gridColumnGap="4" mb="3">
              <Box color="red.400">
                <AiFillMinusCircle size="24" />
              </Box>
              <Text color="gray.500" fontSize="sm">
                Lent
              </Text>
            </Flex>
            <Flex justify="flex-start" align="center" gridColumnGap="4" mb="3">
              <Box color="red.400">
                <MdOutlineIncompleteCircle size="24" />
              </Box>
              <Text color="gray.500" fontSize="sm">
                Partially Recieved
              </Text>
            </Flex>
            <Flex justify="flex-start" align="center" gridColumnGap="4" mb="3">
              <Box color="green.400">
                <AiFillCheckCircle size="24" />
              </Box>
              <Text color="gray.500" fontSize="sm">
                Recieved
              </Text>
            </Flex>
            <Flex justify="flex-start" align="center" gridColumnGap="4" mb="3">
              <Box color="yellow.400">
                <AiFillPlusCircle size="24" />
              </Box>
              <Text color="gray.500" fontSize="sm">
                Borrowed
              </Text>
            </Flex>
            <Flex justify="flex-start" align="center" gridColumnGap="4" mb="3">
              <Box color="yellow.400">
                <MdOutlineIncompleteCircle size="24" />
              </Box>
              <Text color="gray.500" fontSize="sm">
                Partially Repaid
              </Text>
            </Flex>
            <Flex justify="flex-start" align="center" gridColumnGap="4">
              <Box color="blue.400">
                <BiRedo size="24" />
              </Box>
              <Text color="gray.500" fontSize="sm">
                Repaid
              </Text>
            </Flex>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
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
        <NavLink to="/" style={{ background: "blue" }} end>
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
