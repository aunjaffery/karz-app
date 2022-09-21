import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";

const ClientCard = ({ fullName, sub, delWarning }) => {
  let svg = createAvatar(style, {
    seed: fullName,
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
    backgroundColor: "#f3f3f4",
    // ... and other options
  });
  const height = "80px";
  return (
    <Flex position="relative" ml="40px">
      <Flex
        bg={useColorModeValue("green.100", "dark.200")}
        h={height}
        minW={{ base: "100%", sm: "200px" }}
        borderRadius="md"
        boxShadow="lg"
        overflow="hidden"
        justify="space-between"
      >
        <Box
          h={height}
          w={height}
          bg={useColorModeValue("white", "dark.200")}
          borderRadius="full"
          position="absolute"
          top="0"
          left="-40px"
          boxShadow="md"
        >
          <Box w="100%" h="100%" p="1">
            <Avatar name="Dan Abrahmov" src={svg} h="100%" w="100%" />
          </Box>
        </Box>
        <Flex
          ml="40px"
          align="center"
          h="100%"
          justify="flex-start"
          flex={1}
          minW={{ base: 0, sm: "195px" }}
        >
          <Box ml={{ base: 3, md: 4 }} mr="2">
            <Text fontSize="lg" textTransform="capitalize" noOfLines={1}>
              {fullName}
            </Text>
            <Text
              fontSize="xs"
              textTransform="capitalize"
              color={useColorModeValue("gray.600", "gray.400")}
              whiteSpace="nowrap"
            >
              {sub}
            </Text>
          </Box>
        </Flex>
        <Box bg={useColorModeValue("#fafafa", "dark.200")} py="4" pr="4">
          <Flex
            borderLeftWidth={useColorModeValue("none", "2px")}
            h="full"
            justify="center"
            align="center"
            pl="2"
          >
            <IconButton
              size="sm"
              bg="none"
              aria-label="back-btn"
              borderRadius="lg"
              _hover={{
                bg: "none",
                color: "red.400",
              }}
              _active={{
                bg: "red.100",
              }}
              onClick={delWarning}
              icon={<AiFillDelete size="20" />}
            />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
export default ClientCard;
