import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";

const Test = () => {
  return (
    <Box mt="4">
      <Container maxW="container.xl" h="100%">
        <Box pb="6">
          {Array.from(Array(10).keys()).map((x) => (
            <Box
              key={x}
              p="6"
              bg={useColorModeValue("gray.200", "dark.200")}
              mb="6"
              borderRadius="lg"
            >
              <Text fontWeight="bold" mb="2" fontSize="xl">
                Heading {x + 1}
              </Text>
              <Text color="gray.500">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Test;
