import {
  Box,
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
import moment from "moment";

const MarkCompModal = ({
  isOpen,
  onClose,
  onMarkTransaction,
  markLoading,
  data,
}) => {
  const variant = useBreakpointValue(
    {
      base: "bottom",
      md: "right",
    },
    {
      fallback: "bottom",
    }
  );

  const onMarkCompleteForm = (e) => {
    e.preventDefault();
    let paymentDate = e.target.paymentDate.value;
    let amount = e.target.amount.value;
    if ((!paymentDate, !amount)) return;
    onMarkTransaction(amount, paymentDate);
  };
  return (
    <Drawer
      placement={variant}
      onClose={onClose}
      isOpen={isOpen}
      size="sm"
      blockScrollOnMount={false}
    >
      <DrawerOverlay />
      <DrawerContent
        borderTopRadius={{ base: "30px", md: "none" }}
        bg={useColorModeValue("white", "dark.200")}
      >
        <DrawerCloseButton color={useColorModeValue("white", "dark.200")} />
        <DrawerHeader borderBottomWidth="1px">Mark as Complete</DrawerHeader>
        <form onSubmit={onMarkCompleteForm}>
          <DrawerBody>
            <Box pt="6">
              <FormControl color="gray.500" mb="4">
                <FormLabel>Amount</FormLabel>
                <Input
                  name="amount"
                  type="number"
                  border={useColorModeValue("1px", "none")}
                  color={useColorModeValue("black", "white")}
                  bg={useColorModeValue("white", "dark.100")}
                  max={data?.remaining_amount}
                  defaultValue={data?.remaining_amount}
                  isRequired
                />
              </FormControl>
              <FormControl color="gray.500">
                <FormLabel>Payment Date</FormLabel>
                <Input
                  name="paymentDate"
                  type="datetime-local"
                  border={useColorModeValue("1px", "none")}
                  color={useColorModeValue("black", "white")}
                  bg={useColorModeValue("white", "dark.100")}
                  isRequired
                  defaultValue={moment().format("YYYY-MM-DDThh:mm")}
                  max={moment().format("YYYY-MM-DDThh:mm")}
                  min={moment(data?.transaction_date).format(
                    "YYYY-MM-DDThh:mm"
                  )}
                  borderColor="gray.400"
                />
              </FormControl>
            </Box>
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
              isLoading={markLoading}
            >
              Confirm
            </Button>
            <Button variant="danger" onClick={onClose} w="full">
              Close
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default MarkCompModal;
