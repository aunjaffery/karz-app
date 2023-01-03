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
import { ExpIconFun } from "@src/icons/ExpIconDynamic";
import moment from "moment";
import { toast } from "react-toastify";

const ExpenseCard = ({ data }) => {
  const queryClient = useQueryClient();
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  let cardBr = useColorModeValue("#e5e5e5", "#282f3c");
  let cardColor = useColorModeValue("gray.600", "gray.300");
  let iconBg = useColorModeValue("purple.400", "dark.200");
  let iconColor = useColorModeValue("white", "purple.400");

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
    <Box bg="none" maxW="400px">
      <Flex gridColumnGap="3" onClick={onDetailOpen} cursor="pointer">
        <Box p="2" bg={iconBg} borderRadius="xl" color={iconColor}>
          {<ExpIconFun title={data?.title} />}
        </Box>
        <Box w="full" h="full">
          <Flex
            justify="space-between"
            align="center"
            w="full"
            gridColumnGap="4"
            pr="1"
          >
            <Flex direction="column" justify="center" flex="8" h="full">
              <Text
                color={cardColor}
                noOfLines={1}
                textTransform="capitalize"
                fontWeight="bold"
                fontSize="sm"
              >
                {data?.title ? data?.title : "Anonymous"}
              </Text>
              <Text color="gray.500" fontSize="sm" noOfLines={1}>
                {data?.description ? data?.description : "_"}
              </Text>
            </Flex>
            <Flex
              direction="column"
              justify="center"
              align="flex-end"
              h="full"
              flex="2"
            >
              <Text color="red.400" whiteSpace="nowrap" fontWeight="bold">
                {formatter.format(data.amount)}
              </Text>
              <Text
                fontSize="xs"
                textTransform="uppercase"
                color="gray.500"
                whiteSpace="nowrap"
              >
                {data?.expense_date
                  ? moment(data?.expense_date).format("DD MMM")
                  : "unk"}
              </Text>
            </Flex>
          </Flex>
          <Box bg={cardBr} mt="1" h="1px" />
        </Box>
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
