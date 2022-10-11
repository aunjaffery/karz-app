import {
  Avatar,
  Box,
  Container,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";
import { BsFillMoonFill, BsFillSunFill, BsChevronRight } from "react-icons/bs";
import { ImUser } from "react-icons/im";
import { HiChatAlt } from "react-icons/hi";
import { AiOutlineQuestion } from "react-icons/ai";
import { RiFileList3Fill, RiLogoutCircleLine } from "react-icons/ri";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ErrorFlex from "@comp/placeholders/ErrorFlex";
import useBoundStore from "@src/store/Store";

const Settings = () => {
  const user = useBoundStore((state) => {
    return state.user ? state.user : false;
  });
  const avaBg = useColorModeValue("#f3f3f4", "#252a41");
  const avaBorder = useColorModeValue("gray.400", "gray.200");
  const avaBorderWidth = useColorModeValue("0", "2px");
  const queryClient = useQueryClient();
  const { logoutService } = useBoundStore((state) => state);

  const onLogout = async () => {
    queryClient.clear();
    logoutService();
    console.log("Signout Successfull");
  };

  const { colorMode, toggleColorMode } = useColorMode();

  if (!user) {
    return <ErrorFlex />;
  }

  let svg = createAvatar(style, {
    seed: user?.fullName,
    dataUri: true,
    hair: [
      "short01",
      "short02",
      "short03",
      "short04",
      "short05",
      "short06",
      "short07",
      "short08",
      "short09",
      "short10",
    ],
    backgroundColor: avaBg,
  });
  return (
    <Box mt="2">
      <Container maxW="container.xl" h="100%">
        <Box
          borderBottomWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          pb="5"
        >
          <Flex gridColumnGap="4" align="center">
            <Avatar
              name="Ryan Florence"
              size="xl"
              src={svg}
              borderWidth={avaBorderWidth}
              borderColor={avaBorder}
            />
            <Box>
              <Text fontSize="lg" textTransform="capitalize" fontWeight="bold">
                {user?.fullName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {user?.email}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Flex pt="8" direction="column" gridRowGap="6">
          <Link to="profile">
            <Flex
              justify="space-between"
              align="center"
              _hover={{ color: "blue.400" }}
              cursor="pointer"
            >
              <Flex gridColumnGap="4" align="center">
                <Flex
                  bg={useColorModeValue("gray.200", "dark.200")}
                  borderRadius="lg"
                  color={useColorModeValue("black", "white")}
                  align="center"
                  px="2"
                  py="2"
                >
                  <ImUser />
                </Flex>
                <Text>Profile</Text>
              </Flex>
              <Flex align="center">
                <BsChevronRight />
              </Flex>
            </Flex>
          </Link>
          <Link to="aboutme">
            <Flex
              justify="space-between"
              align="center"
              _hover={{ color: "blue.400" }}
              cursor="pointer"
            >
              <Flex gridColumnGap="4" align="center">
                <Flex
                  bg={useColorModeValue("gray.200", "dark.200")}
                  borderRadius="lg"
                  color={useColorModeValue("black", "white")}
                  align="center"
                  px="2"
                  py="2"
                >
                  <HiChatAlt />
                </Flex>
                <Text>About Me</Text>
              </Flex>
              <Flex align="center">
                <BsChevronRight />
              </Flex>
            </Flex>
          </Link>
          <Link to="guide">
            <Flex
              justify="space-between"
              align="center"
              _hover={{ color: "blue.400" }}
              cursor="pointer"
            >
              <Flex gridColumnGap="4" align="center">
                <Flex
                  bg={useColorModeValue("gray.200", "dark.200")}
                  borderRadius="lg"
                  color={useColorModeValue("black", "white")}
                  align="center"
                  px="2"
                  py="2"
                >
                  <AiOutlineQuestion />
                </Flex>
                <Text>Guide</Text>
              </Flex>
              <Flex align="center">
                <BsChevronRight />
              </Flex>
            </Flex>
          </Link>
          <Link to="terms">
            <Flex
              justify="space-between"
              align="center"
              _hover={{ color: "blue.400" }}
              cursor="pointer"
            >
              <Flex gridColumnGap="4" align="center">
                <Flex
                  bg={useColorModeValue("gray.200", "dark.200")}
                  borderRadius="lg"
                  color={useColorModeValue("black", "white")}
                  align="center"
                  px="2"
                  py="2"
                >
                  <RiFileList3Fill />
                </Flex>
                <Text>Terms of service</Text>
              </Flex>
              <Flex align="center">
                <BsChevronRight />
              </Flex>
            </Flex>
          </Link>
          <Flex
            justify="space-between"
            align="center"
            _hover={{ color: "blue.400" }}
            cursor="pointer"
            onClick={toggleColorMode}
          >
            <Flex gridColumnGap="4" align="center">
              <Flex
                bg={useColorModeValue("gray.200", "dark.200")}
                borderRadius="lg"
                color={useColorModeValue("black", "white")}
                align="center"
                px="2"
                py="2"
              >
                {colorMode === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
              </Flex>
              <Text>{colorMode === "light" ? "Dark " : "Light "}mode</Text>
            </Flex>
            <Flex align="center">
              <BsChevronRight />
            </Flex>
          </Flex>
          <Flex
            justify="space-between"
            align="center"
            cursor="pointer"
            onClick={onLogout}
            _hover={{ color: "red.600" }}
            color="red.400"
          >
            <Flex gridColumnGap="4" align="center">
              <Flex
                bg={useColorModeValue("gray.200", "dark.200")}
                borderRadius="lg"
                color={useColorModeValue("red.500", "red.500")}
                align="center"
                px="2"
                py="2"
              >
                <RiLogoutCircleLine />
              </Flex>
              <Text>Logout</Text>
            </Flex>
            <Flex align="center">
              <BsChevronRight />
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Settings;
