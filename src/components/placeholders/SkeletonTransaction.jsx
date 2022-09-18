import {
  Box,
  Flex,
  Skeleton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const SkeletonTransaction = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      maxW="360px"
      bg={useColorModeValue("white", "dark.200")}
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      p="1"
      h="74px"
    >
      <Flex gridColumnGap="4">
        <Box w="66px" h="66px">
          {colorMode === "light" ? (
            <Skeleton
              startColor="red.100"
              endColor="yellow.100"
              height="100%"
              w="66px"
              h="66px"
              borderRadius="lg"
            />
          ) : (
            <Flex justify="center" align="center" h="full" ml="2">
              <Skeleton w="50px" h="50px" borderRadius="full" />
            </Flex>
          )}
        </Box>
        <Flex w="full" justify="space-between" pr="2">
          <Flex justify="space-evenly" direction="column">
            <Skeleton height="17px" borderRadius="md">
              <Box>aun jaffery dev</Box>
            </Skeleton>
            <Flex>
              <Skeleton height="12px" borderRadius="md">
                <Box>aun dev</Box>
              </Skeleton>
            </Flex>
          </Flex>
          <Flex justify="space-evenly" direction="column">
            <Skeleton height="17px" borderRadius="md">
              <Box>Rs 99999</Box>
            </Skeleton>
            <Flex>
              <Skeleton height="12px" borderRadius="md">
                <Box>aun dev</Box>
              </Skeleton>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
export default SkeletonTransaction;
