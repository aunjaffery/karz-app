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
  useToast,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import { addNewTransaction, db } from "@src/fireConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@src/Auth";
import moment from "moment";

const AddTransModal = ({ isOpen, onClose }) => {
  const { currentUser } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [transLoading, setTransLoading] = useState(false);
  const [clientLoading, setClientLoading] = useState(true);
  const toast = useToast();

  const variant = useBreakpointValue(
    {
      base: "bottom",
      md: "right",
    },
    {
      fallback: "bottom",
    }
  );

  const q = query(collection(db, "users", currentUser?.uid, "clients"));
  const clientCall = async () => {
    try {
      const querySnapshot = await getDocs(q);
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          id: doc.id,
          name: doc.data()?.name,
        });
      });
      setClients(arr);
      setClientLoading(false);
    } catch (error) {
      console.log(error);
      setClientLoading(false);
    }
  };
  useEffect(() => {
    clientCall();
  }, []);

  const onSubmitTransaction = async (e) => {
    e.preventDefault();
    let data = {
      client: "",
      amount: "",
      date: "",
      status: "",
    };
    for (let key of Object.keys(data)) {
      if (!e.target[key]?.value) return;

      if (key === "amount" || key === "status") {
        data[key] = parseInt(e.target[key].value);
      } else {
        data[key] = e.target[key].value;
      }
    }
    setTransLoading(true);
    try {
      await addNewTransaction(data, currentUser?.uid);
      setTransLoading(false);
      onClose();
      toast({
        title: "Transaction Added successfully",
        status: "success",
        position: "top",
        duration: 1500,
      });
    } catch (error) {
      console.log(error);
      setTransLoading(false);
      toast({
        title: "Failed to add transaction",
        status: "error",
        position: "top",
        duration: 1500,
      });
    }
  };

  return (
    <Drawer placement={variant} onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent borderTopRadius={{ base: "xl", md: "none" }}>
        <DrawerCloseButton color="white" />
        <DrawerHeader borderBottomWidth="1px">Add Transaction</DrawerHeader>
        {clientLoading ? (
          <Flex w="100%" minH="400px" justify="center" align="center">
            <Spinner size="xl" color="blue.400" thickness="3px" />
          </Flex>
        ) : (
          <form onSubmit={onSubmitTransaction}>
            <DrawerBody pt="6" pb="2">
              {!clients.length && (
                <Alert status="warning" mb="6">
                  <AlertIcon mb="2px" />
                  Please add client first.
                </Alert>
              )}
              <Stack
                gridGap="4"
                direction={{ base: "column", lg: "row" }}
                mb="4"
              >
                <FormControl>
                  <FormLabel color="gray.600">Client</FormLabel>
                  <Select name="client" isRequired>
                    {clients.map((d) => (
                      <option value={d.name} key={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl color="gray.600">
                  <FormLabel>Amount</FormLabel>
                  <Input name="amount" type="number" isRequired />
                </FormControl>
              </Stack>
              <FormControl color="gray.600" mb="4">
                <FormLabel>Date</FormLabel>
                <Input
                  name="date"
                  type="datetime-local"
                  defaultValue={moment().format("YYYY-MM-DDThh:mm")}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel color="gray.600">Status</FormLabel>
                <RadioGroup
                  defaultValue="1"
                  ml="1"
                  sx={{ touchAction: "none" }}
                  name="status"
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
                colorScheme="green"
                type="submit"
                w="full"
                isLoading={transLoading}
              >
                Confirm
              </Button>
              <Button colorScheme="twitter" mr={3} onClick={onClose} w="full">
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
