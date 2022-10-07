import {
  Box,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { data } from "./data";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { GrStackOverflow } from "react-icons/gr";
import moment from "moment";
import { useState } from "react";

const Expense = () => {
  const [selectedMon, setSelectedMon] = useState(moment().format("MMM YYYY"));
  let monthFunc = () => {
    let monthArr = [];
    for (let i = 3; i >= 0; i--) {
      monthArr.push(moment().subtract(i, "month").format("MMM YYYY"));
    }
    return monthArr;
  };
  let monthBg = useColorModeValue("white", "dark.200");
  let monthBr = useColorModeValue("green.300", "green.800");
  let btnBg = useColorModeValue("green.400", "dark.200");
  let btnColor = useColorModeValue("white", "green.400");
  return (
    <Box mt="2">
      <Container maxW="container.xl" h="100%">
        <Flex justify="space-between" align="center">
          <Flex justify="flex-start" align="center" gridColumnGap="2">
            {monthFunc().map((x, id) => (
              <Box
                borderRadius="xl"
                px="4"
                py="2"
                bg={monthBg}
                key={id}
                boxShadow="sm"
                borderWidth={selectedMon === x ? "1px" : "0"}
                borderColor={monthBr}
                onClick={() => setSelectedMon(x)}
                cursor="pointer"
              >
                <Text
                  fontSize="sm"
                  color={selectedMon === x ? "green.400" : "gray.500"}
                  fontWeight="bold"
                  textAlign="center"
                  whiteSpace="nowrap"
                >
                  {moment(x, "MMM YYYY").format("MMM")}
                </Text>
              </Box>
            ))}
          </Flex>
          <Button
            size="sm"
            borderRadius="full"
            px="0"
            bg={btnBg}
            color={btnColor}
            _hover={{
              bg: "green.500",
              color: "white",
            }}
            _active={{
              bg: "green.600",
              color: "white",
            }}
          >
            <AiOutlinePlus size="18" />
          </Button>
        </Flex>
        <Box py="5">
          <ExpenseMonth />
          <SimpleGrid columns={[1, 1, 2, 3]} spacing="3">
            {data.map((x) => (
              <ExpenseCard key={x.id} data={x} />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};
const ExpenseMonth = () => {
  let formatter = Intl.NumberFormat("en");
  let wcolor = useColorModeValue("gray.500", "gray.400");
  return (
    <Box maxW="400px" mb="3">
      <Flex justify="space-between" align="center" px="2">
        <Flex align="center" gridColumnGap="5px">
          <Box color={wcolor} mb="2px">
            <GrStackOverflow />
          </Box>
          <Text color={wcolor} fontSize="sm" fontWeight="bold">
            Total
          </Text>
        </Flex>
        <Text whiteSpace="nowrap" fontWeight="bold" color={wcolor}>
          Rs {formatter.format(500000)}
        </Text>
      </Flex>
    </Box>
  );
};

const ExpenseCard = ({ data }) => {
  const { isOpen, onToggle } = useDisclosure();
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <Box
      bg={useColorModeValue("white", "dark.200")}
      borderRadius="lg"
      boxShadow="md"
      maxW="400px"
    >
      <Flex gridColumnGap="4" h="full">
        <Box py="3">
          <Flex
            direction="column"
            align="center"
            justify="center"
            px="4"
            borderRightWidth="1px"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            h="full"
          >
            <Text fontSize="xs" textTransform="uppercase" color="blue.500">
              Oct
            </Text>
            <Text fontSize="sm" color="blue.500">
              03
            </Text>
          </Flex>
        </Box>
        <Flex
          justify="space-between"
          align="center"
          pr="4"
          w="full"
          h="full"
          gridColumnGap="4"
        >
          <Flex
            h="100%"
            w="100%"
            onClick={onToggle}
            cursor="pointer"
            align="center"
            py="4"
          >
            <Text
              color={useColorModeValue("gray.600", "gray.300")}
              fontSize="sm"
              noOfLines={isOpen ? 0 : 1}
              textTransform="capitalize"
            >
              {data?.title ? data?.title : "No title"}
            </Text>
          </Flex>
          {isOpen ? (
            <Flex align="center" h="full" color="red.500">
              <AiFillDelete />
            </Flex>
          ) : (
            <Text color="red.400" whiteSpace="nowrap" fontWeight="bold">
              Rs {formatter.format(data.amount)}
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Expense;
