import { Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlineFileSearch } from "react-icons/ai";

const NoExpense = () => {
  return (
    <Flex
      w="100%"
      minH="400px"
      justify="center"
      align="center"
      direction="column"
    >
      <Box color="gray.500" mb="2">
        <AiOutlineFileSearch size="48" />
      </Box>
      <Text color="gray.500" textAlign="center" fontSize="sm">
        No Expenses found.
      </Text>
    </Flex>
  );
};
export default NoExpense;
