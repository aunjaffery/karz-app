import { Avatar, Box, Flex, IconButton, Text } from "@chakra-ui/react";
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
  return (
    <Flex position="relative" ml="45px">
      <Flex
        bg="green.100"
        h="90px"
        minW={{ base: "100%", sm: "200px" }}
        borderRadius="md"
        boxShadow="lg"
        overflow="hidden"
        justify="space-between"
      >
        <Box
          h="90px"
          w="90px"
          bg="white"
          borderRadius="full"
          position="absolute"
          top="0"
          left="-45px"
          boxShadow="0 0 0.5rem #babbbc"
        >
          <Box w="100%" h="100%" p="1">
            <Avatar name="Dan Abrahmov" src={svg} h="100%" w="100%" />
          </Box>
        </Box>
        <Flex
          ml="45px"
          align="center"
          h="100%"
          justify="flex-start"
          flex={1}
          minW={{ base: 0, sm: "195px" }}
        >
          <Box ml="4">
            <Text
              fontSize="lg"
              textTransform="capitalize"
              color="gray.700"
              whiteSpace="nowrap"
            >
              {fullName}
            </Text>
            <Text
              fontSize="xs"
              textTransform="capitalize"
              color="gray.600"
              whiteSpace="nowrap"
            >
              {sub}
            </Text>
          </Box>
        </Flex>
        <Flex bg="#fafafa" px="4" justify="center" align="center">
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
      </Flex>
    </Flex>
  );
};
export default ClientCard;
