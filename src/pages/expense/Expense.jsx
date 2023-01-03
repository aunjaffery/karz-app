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
import { useEffect, useState } from "react";
import ExpenseCard from "@comp/cards/ExpenseCard";
import { useQuery } from "@tanstack/react-query";
import { fetchUserExpenses } from "../../services/Apis";
import ErrorFlex from "@comp/placeholders/ErrorFlex";
import { AiOutlinePlus } from "react-icons/ai";
import { GrStackOverflow } from "react-icons/gr";
import AddExpenseModal from "@comp/modals/AddExpenseModal";
import SkeletonExpense from "@comp/placeholders/SkeletonExpense";
import NoExpense from "@comp/placeholders/NoExpense";
import useBoundStore from "@src/store/Store";
import moment from "moment";
import { toast } from "react-toastify";

const Expense = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { setTransFetching } = useBoundStore((state) => state);
  const [selectedMon, setSelectedMon] = useState(moment().format("MMM-YYYY"));
  const { data, isLoading, isFetching, isError } = useQuery(
    ["fetchUserExpenses", { date: selectedMon, offset: moment().utcOffset() }],
    fetchUserExpenses,
    {
      refetchOnWindowFocus: false,
      onError: () => toast.error("Error! Cannot fetch expenses"),
    }
  );
  useEffect(() => {
    setTransFetching(isFetching);
    return () => setTransFetching(false);
  }, [isFetching]);
  let monthFunc = () => {
    let monthArr = [];
    for (let i = 3; i >= 0; i--) {
      monthArr.push(moment().subtract(i, "month").format("MMM-YYYY"));
    }
    return monthArr;
  };
  const {
    isOpen: isAddExpOpen,
    onOpen: onAddExpOpen,
    onClose: onAddExpClose,
  } = useDisclosure();

  let monthBg = useColorModeValue("white", "dark.200");
  let monthBr = useColorModeValue("green.300", "green.800");
  let btnBg = useColorModeValue("green.400", "dark.200");
  let btnColor = useColorModeValue("white", "green.400");

  if (isError) {
    return <ErrorFlex />;
  }

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
                  {moment(x, "MMM-YYYY").format("MMM")}
                </Text>
              </Box>
            ))}
          </Flex>
          <Button
            size="sm"
            borderRadius="full"
            px="0"
            onClick={onAddExpOpen}
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
        {isLoading ? (
          <Box py="5">
            <SimpleGrid columns={[1, 1, 2, 3]} spacing="3">
              {[1, 2, 3, 4].map((x) => (
                <SkeletonExpense key={x} />
              ))}
            </SimpleGrid>
          </Box>
        ) : !data?.expenses.length ? (
          <NoExpense />
        ) : (
          <Box py="5">
            <ExpenseTotal total={data?.total_expense} month={selectedMon} />
            <SimpleGrid columns={[1, 1, 2, 3]} spacing="4">
              {data?.expenses.map((x) => (
                <ExpenseCard key={x.id} data={x} />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
      <AddExpenseModal isOpen={isAddExpOpen} onClose={onAddExpClose} />
    </Box>
  );
};
const ExpenseTotal = ({ total, month }) => {
  let formatter = Intl.NumberFormat("en");
  let wcolor = useColorModeValue("gray.500", "gray.400");
  return (
    <Box maxW="400px" mb="4">
      <Flex justify="space-between" align="center" px="1">
        <Flex align="center" gridColumnGap="5px">
          <Box color={wcolor}>
            <GrStackOverflow />
          </Box>
          <Text color={wcolor} fontSize="sm" fontWeight="bold">
            {moment(month, "MMM-YYYY").format("MMM")} Expense
          </Text>
        </Flex>
        <Text whiteSpace="nowrap" fontWeight="bold" color={wcolor}>
          {total ? `Rs ${formatter.format(total)}` : "Unknown"}
        </Text>
      </Flex>
    </Box>
  );
};

export default Expense;
