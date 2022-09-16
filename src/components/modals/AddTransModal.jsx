import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Select,
  Stack,
  useBreakpointValue,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  DrawerCloseButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewTransaction, fetchUserClients } from "../../services/Apis";
import { toast } from "react-toastify";

const AddTransModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { data: clients, isLoading: clientLoading } = useQuery(
    ["fetchUserClients"],
    fetchUserClients,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { mutate: addTransaction, isLoading: transLoading } = useMutation(
    addNewTransaction,
    {
      onSuccess: () => {
        toast.success("Transaction added successfully");
        onClose();
        queryClient.invalidateQueries(["fetchTransactions"]);
      },
      onError: () => toast.error("Error! Cannot create transaction"),
    }
  );

  const variant = useBreakpointValue(
    { base: "bottom", md: "right" },
    { fallback: "bottom" }
  );

  const onSubmitTransaction = async (e) => {
    e.preventDefault();
    let data = {
      client_id: "",
      amount: "",
      transaction_date: "",
      status: "",
    };
    for (let key of Object.keys(data)) {
      if (!e.target[key]?.value) return;

      if (key === "amount" || key === "status" || key === "client_id") {
        data[key] = parseInt(e.target[key].value);
      } else {
        data[key] = e.target[key].value;
      }
    }
    addTransaction(data);
  };

  return (
    <Drawer placement={variant} onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent
        borderTopRadius={{ base: "30px", md: "none" }}
        bg={useColorModeValue("white", "dark.200")}
      >
        <DrawerCloseButton color={useColorModeValue("white", "dark.200")} />
        <DrawerHeader borderBottomWidth="1px">Add Transaction</DrawerHeader>
        {clientLoading ? (
          <Flex w="100%" minH="400px" justify="center" align="center">
            <Spinner size="xl" color="blue.400" thickness="3px" />
          </Flex>
        ) : (
          <form onSubmit={onSubmitTransaction}>
            <DrawerBody pt="6" pb="2">
              {!clients?.result.length && (
                <Alert status="warning" mb="6">
                  <AlertIcon mb="2px" />
                  <Text>Please add client first.</Text>
                  <Link to="/clients">
                    <Text
                      color="blue.400"
                      ml="1"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Here
                    </Text>
                  </Link>
                </Alert>
              )}
              <Stack
                gridGap="4"
                direction={{ base: "column", lg: "row" }}
                mb="4"
              >
                <FormControl>
                  <FormLabel color="gray.500">Client</FormLabel>
                  <Select
                    name="client_id"
                    isRequired
                    isDisabled={!clients?.result?.length}
                    border={useColorModeValue("1px", "none")}
                    color={useColorModeValue("black", "white")}
                    bg={useColorModeValue("white", "dark.100")}
                  >
                    {clients?.result.map((d) => (
                      <option value={d.id} key={d.id}>
                        {d.fullName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl color="gray.500">
                  <FormLabel>Amount</FormLabel>
                  <Input
                    name="amount"
                    type="number"
                    max="9999999"
                    border={useColorModeValue("1px", "none")}
                    color={useColorModeValue("black", "white")}
                    bg={useColorModeValue("white", "dark.100")}
                    isRequired
                    isDisabled={!clients?.result?.length}
                  />
                </FormControl>
              </Stack>
              <FormControl color="gray.500" mb="4">
                <FormLabel>Date</FormLabel>
                <Input
                  name="transaction_date"
                  type="datetime-local"
                  defaultValue={moment().format("YYYY-MM-DDThh:mm")}
                  max={moment().format("YYYY-MM-DDThh:mm")}
                  border={useColorModeValue("1px", "none")}
                  color={useColorModeValue("black", "white")}
                  bg={useColorModeValue("white", "dark.100")}
                  isRequired
                  isDisabled={!clients?.result?.length}
                />
              </FormControl>
              <FormControl>
                <FormLabel color="gray.500">Status</FormLabel>
                <RadioGroup
                  defaultValue="1"
                  ml="1"
                  sx={{ touchAction: "none" }}
                  name="status"
                  isDisabled={!clients?.result?.length}
                >
                  <Stack direction="row" spacing="6">
                    <Radio value="1" sx={{ touchAction: "none" }}>
                      Lent
                    </Radio>
                    <Radio value="3" sx={{ touchAction: "none" }}>
                      Borrowed
                    </Radio>
                  </Stack>
                </RadioGroup>
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
                isLoading={transLoading}
                isDisabled={!clients?.result?.length}
              >
                Confirm
              </Button>
              <Button variant="danger" mr={3} onClick={onClose} w="full">
                Close
              </Button>
            </DrawerFooter>
          </form>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransModal;
