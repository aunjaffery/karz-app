import { Box, Flex, Skeleton, useColorModeValue } from "@chakra-ui/react";

const SkeletonExpense = () => {
  return (
    <Box
      maxW="400px"
      bg={useColorModeValue("white", "dark.200")}
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      h="63px"
    >
      <Flex gridColumnGap="4" h="100%" align="center">
        <Box pl="4" pr="2">
          <Skeleton w="30px" h="30px" borderRadius="lg" />
        </Box>
        <Flex align="center" justify="space-between" w="full" pr="4">
          <Skeleton height="20px" borderRadius="md">
            <Box>aun jaffery dev snns</Box>
          </Skeleton>
          <Skeleton height="20px" borderRadius="md">
            <Box>Rs 10k</Box>
          </Skeleton>
        </Flex>
      </Flex>
    </Box>
  );
};
export default SkeletonExpense;
