import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  AiFillCheckCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { BiRedo } from "react-icons/bi";
import { MdOutlineIncompleteCircle } from "react-icons/md";
const Guide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let size = 36;
  return (
    <Box mb="4" mt="4">
      <Container maxW="container.xl" h="100%">
        <Box px="2">
          <Flex justify="flex-start" align="center" gridColumnGap="4" mb="4">
            <Box color="red.400">
              <AiFillMinusCircle size={size} />
            </Box>
            <Text color="gray.500" fontSize="md">
              Lent
            </Text>
          </Flex>
          <Flex justify="flex-start" align="center" gridColumnGap="4" mb="4">
            <Box color="red.400">
              <MdOutlineIncompleteCircle size={size} />
            </Box>
            <Text color="gray.500" fontSize="md">
              Partially Recieved
            </Text>
          </Flex>
          <Flex justify="flex-start" align="center" gridColumnGap="4" mb="4">
            <Box color="green.400">
              <AiFillCheckCircle size={size} />
            </Box>
            <Text color="gray.500" fontSize="md">
              Recieved
            </Text>
          </Flex>
          <Flex justify="flex-start" align="center" gridColumnGap="4" mb="4">
            <Box color="yellow.400">
              <AiFillPlusCircle size={size} />
            </Box>
            <Text color="gray.500" fontSize="md">
              Borrowed
            </Text>
          </Flex>
          <Flex justify="flex-start" align="center" gridColumnGap="4" mb="4">
            <Box color="yellow.400">
              <MdOutlineIncompleteCircle size={size} />
            </Box>
            <Text color="gray.500" fontSize="md">
              Partially Repaid
            </Text>
          </Flex>
          <Flex justify="flex-start" align="center" gridColumnGap="4">
            <Box color="blue.400">
              <BiRedo size={size} />
            </Box>
            <Text color="gray.500" fontSize="md">
              Repaid
            </Text>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Guide;
