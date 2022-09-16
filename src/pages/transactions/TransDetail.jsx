import {
  Box,
  Container,
  Flex,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import BreadCrumbs from "@comp/misc/BreadCrumbs";

const TransDetail = () => {
  return (
    <Box
      minH="calc(100vh - 4rem)"
      sx={{
        //background: "linear-gradient(to right, #b993d6, #8ca6db)",
      }}
    >
      <Container maxW="container.xl" h="100%">
        <BreadCrumbs
          paths={[
            { id: 1, name: "transaction", path: "/transaction", dis: true },
          ]}
          //color="white"
          //hcolor="white"
        />
        <Box mb="10" mt="2" ml="2px">
          <Text fontWeight="bold" fontSize="3xl">
            Transaction
          </Text>
        </Box>
      </Container>
      <Container maxW="container.xl" px={{ base: 0, sm: "1rem" }}>
        <Box
          pb="6"
          px="4"
          borderTopRadius="30px"
          bg={useColorModeValue("white", "dark.200")}
          h="100%"
          borderBottomRadius={{ base: "none", sm: "30px" }}
        >
          {Array.from(Array(1).keys()).map((x) => (
            <Box key={x} py="8" px="4">
              <Box mt="2">
                <Text fontWeight="bold" mb="2" fontSize="xl">
                  Heading {x + 1}
                </Text>
              </Box>
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
                Lorem Ipsum. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum. It was
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

export default TransDetail;
