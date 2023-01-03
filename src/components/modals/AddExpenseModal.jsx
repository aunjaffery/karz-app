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
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewExpense } from "../../services/Apis";
import moment from "moment";
import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

const AddExpenseModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [titleError, setTitleError] = useState(false);
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
    if (!title) {
      setTitleError(true);
      return;
    }
    let description = e.target.description?.value;
    let amount = e.target.amount?.value;
    let input_date = e.target.expense_date?.value;
    let expense_date = moment(input_date).toDate();
    if (!amount || !expense_date) return;
    mutate({ title, description, amount, expense_date });
  };
  const tborder = useColorModeValue("1px", "none");
  const tcolor = useColorModeValue("black", "white");
  const tbg = useColorModeValue("white", "#161c2c");
  const rsplc = useColorModeValue("#718096", "rgba(255,255,255,0.24)");
  const options = [
    { value: "groceries", label: "Groceries" },
    { value: "medicine", label: "Medicine" },
    { value: "investment", label: "Investment" },
    { value: "stationery", label: "Stationery" },
    { value: "travel", label: "Travel" },
    { value: "vehicle expense", label: "Vehicle expense" },
    { value: "utility bills", label: "Utility bills" },
    { value: "fee", label: "Fee" },
    { value: "donation", label: "Donation" },
    { value: "other", label: "Other" },
  ];
  const selectStyle = {
    control: (prd) => ({
      ...prd,
      background: tbg,
      borderWidth: tborder,
      borderColor: "#CBD5E0",
      height: "40px",
    }),
    placeholder: (prd) => ({
      ...prd,
      color: rsplc,
    }),
    input: (prd) => ({
      ...prd,
      color: tcolor,
    }),
    singleValue: (prd) => ({
      ...prd,
      color: tcolor,
    }),
    option: (prd, st) => ({
      ...prd,
      color: st.isSelected ? "white" : "black",
      background: st.isSelected ? "#3f69ff" : st.isFocused ? "#c9d7f2" : "",
    }),
    menu: (prd) => ({
      ...prd,
      background: "#f5f5f7",
    }),
    menuList: (prd) => ({
      ...prd,
      paddingBottom: "20px",
    }),
    clearIndicator: (prd) => ({
      ...prd,
      color: "#718096",
    }),
    dropdownIndicator: (prd) => ({
      ...prd,
      color: "#718096",
    }),
    indicatorSeparator: (prd) => ({
      ...prd,
      background: rsplc,
    }),
  };

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
              <Creatable
                options={options}
                name="title"
                placeholder="select or create new title"
                onChange={(opt) => (opt?.value ? setTitleError(false) : null)}
                styles={selectStyle}
                isClearable
                required
              />
              {titleError && (
                <Text fontSize="sm" color="red.400" mt="1" ml="1">
                  Title is required
                </Text>
              )}
            </FormControl>
            <FormControl color="gray.500" mb="4">
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                type="text"
                placeholder="Optional"
                maxLength={60}
                border={tborder}
                color={tcolor}
                bg={tbg}
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
