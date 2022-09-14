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
      <DrawerContent borderTopRadius={{ base: "xl", md: "none" }}>
        <DrawerCloseButton color="white" />
        <DrawerHeader borderBottomWidth="1px">Mark as Complete</DrawerHeader>
        <form onSubmit={onMarkCompleteForm}>
          <DrawerBody>
            <Box pt="6">
              <FormControl color="gray.600" mb="4">
                <FormLabel>Amount</FormLabel>
                <Input
                  name="amount"
                  type="number"
                  max={data?.remaining_amount}
                  defaultValue={data?.remaining_amount}
                  isRequired
                />
              </FormControl>
              <FormControl color="gray.600">
                <FormLabel>Payment Date</FormLabel>
                <Input
                  name="paymentDate"
                  type="datetime-local"
                  isRequired
                  defaultValue={moment().format("YYYY-MM-DDThh:mm")}
                  max={moment().format("YYYY-MM-DDThh:mm")}
                  min={moment(data?.transaction_date).format("YYYY-MM-DDThh:mm")}
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
              colorScheme="green"
              type="submit"
              w="full"
              isLoading={markLoading}
            >
              Confirm
            </Button>
            <Button colorScheme="twitter" onClick={onClose} w="full">
              Close
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default MarkCompModal;
