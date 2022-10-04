import {
  Box,
  Container,
  Flex,
  Progress,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillHome, AiTwotoneSetting } from "react-icons/ai";
import useBoundStore from "@src/store/Store";
import { HiUsers } from "react-icons/hi";
import { BiStats } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const { transFetching } = useBoundStore((state) => state);
//  console.log("<== fetching", transFetching);
  const activeColor = useColorModeValue("gray.800", "white");
  const size = 22;
  return (
    <Box
      bg={useColorModeValue("rgba(245,245,247,0.72)", "rgba(22, 28, 44, 0.72)")}
      backdropBlur="20px"
      backdropSaturate="180%"
      position="fixed"
      w="100%"
      bottom="0"
      borderTopWidth={transFetching ? "none" : "1px"}
      borderTopColor={useColorModeValue("#ededed", "#242326")}
      h="70px"
      sx={{
        backdropFilter: "saturate(180%) blur(20px)",
      }}
    >
      {transFetching && (
        <Progress h="2px" bg="none" colorScheme="blue" isIndeterminate />
      )}
      <Container maxW="container.xl" h="100%">
        <Flex
          w="100%"
          justify="space-between"
          align="flex-start"
          h="100%"
          px="3"
          pt="3"
          color="white"
        >
          <NavLink to="/" end>
            {({ isActive }) => (
              <Flex
                color={isActive ? activeColor : "gray.500"}
                direction="column"
                align="center"
              >
                <AiFillHome size={size} />
                <Text fontSize="xs">Home</Text>
              </Flex>
            )}
          </NavLink>
          <NavLink to="stats">
            {({ isActive }) => (
              <Flex
                color={isActive ? activeColor : "gray.500"}
                direction="column"
                align="center"
              >
                <BiStats size={size} />
                <Text fontSize="xs">Stats</Text>
              </Flex>
            )}
          </NavLink>
          <NavLink to="clients">
            {({ isActive }) => (
              <Flex
                color={isActive ? activeColor : "gray.500"}
                direction="column"
                align="center"
              >
                <HiUsers size={size} />
                <Text fontSize="xs">Clients</Text>
              </Flex>
            )}
          </NavLink>
          <NavLink to="settings">
            {({ isActive }) => (
              <Flex
                color={isActive ? activeColor : "gray.500"}
                direction="column"
                align="center"
              >
                <AiTwotoneSetting size={size} />
                <Text fontSize="xs">Settings</Text>
              </Flex>
            )}
          </NavLink>
        </Flex>
      </Container>
    </Box>
  );
};

export default BottomNav;
