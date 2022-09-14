import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import TransDetailModal from "@comp/modals/TransDetailModal";
import MarkCompModal from "@comp/modals/MarkCompModal";
import DeleteClientDialog from "@comp/modals/DeleteClientDialog";
import { BiRedo } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { deleteTransaction, markTransaction } from "../../services/Apis";
import { toast } from "react-toastify";
import {
  AiFillCheckCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillQuestionCircle,
} from "react-icons/ai";
import {MdOutlineIncompleteCircle} from "react-icons/md"

const TransactionCard = ({ data }) => {
  const queryClient = useQueryClient();
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();
  const {
    isOpen: isMarkOpen,
    onOpen: onMarkOpen,
    onClose: onMarkClose,
  } = useDisclosure();
  const {
    isOpen: isDelTransOpen,
    onOpen: onDelTransOpen,
    onClose: onDelTransClose,
  } = useDisclosure();

  const { mutate: transDelMutate, isLoading: delLoading } = useMutation(
    deleteTransaction,
    {
      onSuccess: () => {
        toast.success("Transaction deleted successfully");
        queryClient.invalidateQueries(["fetchTransactions"]);
        onDelTransClose();
      },
      onError: () => toast.error("Error! Cannot delete transaction"),
    }
  );
  const { mutate: markTransMutate, isLoading: markLoading } = useMutation(
    markTransaction,
    {
      onSuccess: () => {
        toast.success("Transaction completed successfully");
        queryClient.invalidateQueries(["fetchTransactions"]);
        onMarkClose();
      },
      onError: () => toast.error("Error! Cannot complete transaction"),
    }
  );

  const onMarkCompleteModal = () => {
    onDetailClose();
    if (data?.id) {
      onMarkOpen();
    }
  };
  const onTransDeleteModal = () => {
    onDetailClose();
    if (data?.id) {
      onDelTransOpen();
    }
  };
  const onTransDelete = async () => {
    if (!data?.id) return;
    transDelMutate(data?.id);
  };

  const onMarkTransaction = async (amount, paymentDate) => {
    if (!data?.id || !paymentDate) return;
    markTransMutate({ id: data?.id, amount, paymentDate });
  };

  const { id, transactionclient, amount, transaction_date, status, last_transaction } = data;
  const colorSelector = (base, status) => {
    if (status === 1 || status === 5) {
      return base === "fg" ? "red.400" : "red.100";
    }
    if (status === 2) {
      return base === "fg" ? "green.400" : "green.100";
    }
    if (status === 3 || status === 6) {
      return base === "fg" ? "yellow.400" : "yellow.100";
    }
    if (status === 4) {
      return base === "fg" ? "blue.400" : "blue.100";
    }
    return base === "fg" ? "gray.400" : "gray.100";
  };

  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <Box
      maxW="360px"
      bg="white"
      p="1"
      borderRadius="lg"
      boxShadow="md"
      key={id}
      cursor="pointer"
      onClick={onDetailOpen}
    >
      <Flex gridColumnGap="4" w="100%">
        <Box>
          <Flex
            color={colorSelector("fg", status)}
            bg={colorSelector("bg", status)}
            p="3"
            borderRadius="lg"
          >
            {status === 1 ? (
              <AiFillMinusCircle size="42" />
            ) : status === 2 ? (
              <AiFillCheckCircle size="42" />
            ) : status === 3 ? (
              <AiFillPlusCircle size="42" />
            ) : status === 4 ? (
              <BiRedo size="42" />
            ) : status === 5  || status === 6? (
              <MdOutlineIncompleteCircle size="42" />
            ) : (
              <AiFillQuestionCircle size="42" />
            )}
          </Flex>
        </Box>
        <Flex justify="space-between" w="100%" pr="2">
          <Flex direction="column" justify="space-evenly">
            <Text fontWeight="bold" textTransform="capitalize">
              {transactionclient?.fullName}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {transaction_date ? moment(transaction_date).format("DD MMM") : "_"}
            </Text>
          </Flex>
          <Flex direction="column" justify="space-evenly">
            <Text fontWeight="bold" color={colorSelector("fg", status)}>
              Rs {formatter.format(amount)}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {last_transaction ? moment(last_transaction).format("DD MMM") : "_"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <TransDetailModal
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        data={data}
        onMarkCompleteModal={onMarkCompleteModal}
        onTransDeleteModal={onTransDeleteModal}
      />
      <MarkCompModal
        isOpen={isMarkOpen}
        onClose={onMarkClose}
        onMarkTransaction={onMarkTransaction}
        markLoading={markLoading}
        data={data}
      />
      <DeleteClientDialog
        isOpen={isDelTransOpen}
        onClose={onDelTransClose}
        triggerFunction={onTransDelete}
        loading={delLoading}
        name="Transaction"
      />
    </Box>
  );
};
export default TransactionCard;