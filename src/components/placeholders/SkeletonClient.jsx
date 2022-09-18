import { Box, Flex, Skeleton, useColorModeValue } from "@chakra-ui/react";

const SkeletonClient = () => {
  return (
    <Box
      maxW="350px"
      bg={useColorModeValue("white", "dark.200")}
      borderRadius="lg"
      borderLeftRadius="60px"
      boxShadow="lg"
      overflow="hidden"
      minW={{ base: "100%", sm: "200px" }}
    >
      <Flex gridColumnGap="3">
        <Box
          bg={useColorModeValue("white", "dark.200")}
          w="90px"
          h="90px"
          borderRadius="full"
          p="2"
        >
          <Skeleton height="100%" borderRadius="full" />
        </Box>
        <Flex justify="center" direction="column">
          <Skeleton height="20px" borderRadius="md">
            <Box>aun jaffery dev snns</Box>
          </Skeleton>
          <Flex mt="3">
            <Skeleton height="12px" borderRadius="md">
              <Box>aun devsn</Box>
            </Skeleton>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
export default SkeletonClient;
