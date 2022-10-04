import { Flex, Text } from "@chakra-ui/react";
const ErrorFlex = () => {
  return (
    <Flex
      minH="400px"
      w="full"
      justify="center"
      align="center"
      direction="column"
    >
      <Text fontSize="4xl">Oops!</Text>
      <Text fontSize="md" color="gray.500">
        Something went worng
      </Text>
      <Text fontSize="sm" color="gray.500">
        Please try again later.
      </Text>
    </Flex>
  );
};

export default ErrorFlex;
