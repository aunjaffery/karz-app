import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewExpense } from "../../services/Apis";
import moment from "moment";
import { toast } from "react-toastify";

const AddExpenseModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createNewExpense, {
    onSuccess: () => {
      toast.success("Expense added successfully");
      onClose();
      queryClient.invalidateQueries(["fetchUserExpenses"]);
    },
    onError: () => toast.error("Error! Cannot create expense"),
  });
  const variant = useBreakpointValue(
    { base: "bottom", md: "right" },
    { fallback: "bottom" }
  );
  const onCreateExpense = async (e) => {
    e.preventDefault();
    let title = e.target.title?.value;
    let amount = e.target.amount?.value;
    let input_date = e.target.expense_date?.value;
    let expense_date = moment(input_date).toDate();
    if (!title || !amount || !expense_date) return;
    console.log({ title, amount, expense_date });
    mutate({ title, amount, expense_date });
  };
  const tborder = useColorModeValue("1px", "none");
  const tcolor = useColorModeValue("black", "white");
  const tbg = useColorModeValue("white", "dark.100");

  return (
    <Drawer placement={variant} onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent
        borderTopRadius={{ base: "30px", md: "none" }}
        bg={useColorModeValue("white", "dark.200")}
      >
        <DrawerCloseButton color={useColorModeValue("white", "dark.200")} />
        <DrawerHeader borderBottomWidth="1px">Add Expense</DrawerHeader>
        <form onSubmit={onCreateExpense}>
          <DrawerBody py="6">
            <FormControl color="gray.500" mb="4">
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                type="text"
                maxLength={60}
                border={tborder}
                color={tcolor}
                bg={tbg}
                isRequired
              />
            </FormControl>
            <FormControl color="gray.500" mb="4">
              <FormLabel>Amount</FormLabel>
              <Input
                name="amount"
                type="number"
                max="9999999"
                border={tborder}
                color={tcolor}
                bg={tbg}
                isRequired
              />
            </FormControl>
            <FormControl color="gray.500">
              <FormLabel>Date</FormLabel>
              <Input
                name="expense_date"
                type="datetime-local"
                defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
                max={moment().format("YYYY-MM-DDTHH:mm")}
                border={tborder}
                color={tcolor}
                bg={tbg}
                isRequired
              />
            </FormControl>
          </DrawerBody>
          <DrawerFooter
            flexDirection="column"
            alignItems="flex-start"
            gridGap="3"
          >
            <Button
              variant="success"
              type="submit"
              w="full"
              isLoading={isLoading}
            >
              Confirm
            </Button>
            <Button variant="danger" mr={3} onClick={onClose} w="full">
              Close
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default AddExpenseModal;
