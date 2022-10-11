import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ExpenseDetailModal from "@comp/modals/ExpenseDetailModal";
import DeleteClientDialog from "@comp/modals/DeleteClientDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "../../services/Apis";
import moment from "moment";
import { toast } from "react-toastify";

const ExpenseCard = ({ data }) => {
  const queryClient = useQueryClient();
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  let cardBg = useColorModeValue("white", "dark.200");
  let cardBr = useColorModeValue("gray.200", "gray.600");
  let cardColor = useColorModeValue("gray.600", "gray.300");

  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();

  const {
    isOpen: isDelExpOpen,
    onOpen: onDelExpOpen,
    onClose: onDelExpClose,
  } = useDisclosure();
  const { mutate: expDelMutate, isLoading: delLoading } = useMutation(
    deleteExpense,
    {
      onSuccess: () => {
        toast.success("Expense deleted successfully");
        queryClient.invalidateQueries(["fetchUserExpenses"]);
        onDelExpClose();
      },
      onError: () => toast.error("Error! Cannot delete transaction"),
    }
  );
  const onExpDeleteModal = () => {
    onDetailClose();
    if (data?.id) {
      onDelExpOpen();
    }
  };
  const onExpenseDelete = async () => {
    if (!data?.id) return;
    expDelMutate(data?.id);
  };
  return (
    <Box bg={cardBg} borderRadius="lg" boxShadow="md" maxW="400px">
      <Flex gridColumnGap="4" onClick={onDetailOpen} cursor="pointer">
        <Box py="3">
          <Flex
            direction="column"
            align="center"
            justify="center"
            px="4"
            borderRightWidth="1px"
            borderColor={cardBr}
          >
            <Text fontSize="xs" textTransform="uppercase" color="blue.500">
              {data?.expense_date
                ? moment(data?.expense_date).format("MMM")
                : "unk"}
            </Text>
            <Text fontSize="sm" color="blue.500">
              {data?.expense_date
                ? moment(data?.expense_date).format("DD")
                : "00"}
            </Text>
          </Flex>
        </Box>
        <Flex
          justify="space-between"
          align="center"
          pr="4"
          w="full"
          gridColumnGap="4"
        >
          <Text
            color={cardColor}
            fontSize="sm"
            noOfLines={1}
            textTransform="capitalize"
          >
            {data?.title ? data?.title : "No title"}
          </Text>
          <Text color="red.400" whiteSpace="nowrap" fontWeight="bold">
            Rs {formatter.format(data.amount)}
          </Text>
        </Flex>
      </Flex>
      <ExpenseDetailModal
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        data={data}
        onExpDeleteModal={onExpDeleteModal}
      />
      <DeleteClientDialog
        isOpen={isDelExpOpen}
        onClose={onDelExpClose}
        triggerFunction={onExpenseDelete}
        loading={delLoading}
        fullName="Expense"
      />
    </Box>
  );
};
export default ExpenseCard;
