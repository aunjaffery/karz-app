import { Box, Flex, Skeleton } from "@chakra-ui/react";

const SkeletonClient = () => {
  return (
    <Box
      maxW="350px"
      bg="white"
	  borderRadius="lg"
	  borderLeftRadius="60px"
      boxShadow="lg"
      overflow="hidden"
      minW={{ base: "100%", sm: "200px" }}
    >
      <Flex gridColumnGap="3">
        <Box bg="white" w="90px" h="90px" borderRadius="full" p="2">
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
