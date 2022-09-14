import Transactions from "@src/icons/Transactions";
import { Box, Flex, Text } from "@chakra-ui/react";

const NoTransactions = () => {
  return (
    <Flex
      w="100%"
      minH="400px"
      justify="center"
      align="center"
      direction="column"
    >
      <Box minW="350px" mb="6" px="6">
        <Transactions />
      </Box>
      <Text color="#a1adb7" textAlign="center">
        You have no transactions.
      </Text>
    </Flex>
  );
};

export default NoTransactions;
