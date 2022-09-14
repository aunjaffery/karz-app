import { Box, Flex, Text } from "@chakra-ui/react";
import Search from "@src/icons/Search";

const NoClients = () => {
  return (
    <Flex
      w="100%"
      minH="400px"
      justify="center"
      align="center"
      direction="column"
    >
      <Box color="gray.400">
        <Search />
      </Box>
      <Text color="#a1adb7" textAlign="center">
        You have no clients.
      </Text>
    </Flex>
  );
};
export default NoClients;
