import { Box, Container, Flex, Text } from "@chakra-ui/react";
import {
  AiFillGithub,
  AiFillGitlab,
  AiFillLinkedin,
  AiOutlineGoogle,
} from "react-icons/ai";
const AboutMe = () => {
  return (
    <Box mt="4">
      <Container maxW="container.xl" h="100%">
        <Box pb="5" textAlign="center">
          <Text fontSize="4xl" textTransform="capitalize" fontWeight="bold">
            Aun Jafery
          </Text>
          <Text fontSize="md" color="gray.500">
            software developer
          </Text>
        </Box>
        <Flex justify="center" mt="6">
          <Flex
            justify="center"
            align="flex-start"
            direction="column"
            gridRowGap="4"
          >
            <Flex
              align="center"
              gridColumnGap="2"
              justify="flex-start"
              cursor="pointer"
              _hover={{ color: "blue.400" }}
            >
              <AiOutlineGoogle size="22" />
              <Text color="gray.500">aunjafery@gmail.com</Text>
            </Flex>
            <Flex
              align="center"
              gridColumnGap="2"
              justify="flex-start"
              cursor="pointer"
              _hover={{ color: "orange.400" }}
              onClick={() => window.open("https://gitlab.com/aunox", "_blank")}
            >
              <AiFillGitlab size="22" />
              <Text color="gray.500">gitlab.com/aunox</Text>
            </Flex>
            <Flex
              align="center"
              gridColumnGap="2"
              justify="flex-start"
              cursor="pointer"
              _hover={{ color: "blue.400" }}
              onClick={() => window.open("https://github.com/aunjaffery", "_blank")}
            >
              <AiFillGithub size="22" />
              <Text color="gray.500">github.com/aunjaffery</Text>
            </Flex>
            <Flex
              align="center"
              gridColumnGap="2"
              justify="flex-start"
              cursor="pointer"
              _hover={{ color: "blue.400" }}
              onClick={() => window.open("https://linkedin.com/in/aunjaffery", "_blank")}
            >
              <AiFillLinkedin size="22" />
              <Text color="gray.500">linkedin.com/in/aunjaffery</Text>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default AboutMe;
