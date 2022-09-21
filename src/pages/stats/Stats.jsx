import { Box, Container, Text } from "@chakra-ui/react";

const Stats = () => {
  return (
    <Box mt="4">
      <Container maxW="container.xl" h="100%">
        <Box px="4">
          <Text fontWeight="bold" mb="2" fontSize="xl">
            Statistics
          </Text>
          <Text color="gray.500">
            We are preparing something exciting & amazing for you.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Stats;
