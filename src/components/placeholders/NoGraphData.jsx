import { Box, Flex, Text } from "@chakra-ui/react";
import { MdQueryStats } from "react-icons/md";

const NoGraphData = () => {
  return (
    <Flex
      w="100%"
      minH="260px"
      justify="center"
      align="center"
      direction="column"
    >
      <Box color="gray.500" mb="2">
        <MdQueryStats size="48" />
      </Box>
      <Text
        color="gray.500"
        textAlign="center"
        fontSize="sm"
        textTransform="capitalize"
      >
        No data available Yet.
      </Text>
    </Flex>
  );
};

export default NoGraphData;
