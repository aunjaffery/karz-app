import {
  Box,
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
  useBreakpointValue,
} from "@chakra-ui/react";
import moment from "moment";

const MarkCompModal = ({ isOpen, onClose, onMarkComplete, markLoading }) => {
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
    let date = e.target.date.value;
    if (!date) return;
    onMarkComplete(date);
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
        <DrawerHeader borderBottomWidth="1px">Mark as Complete</DrawerHeader>
        <form onSubmit={onMarkCompleteForm}>
          <DrawerBody>
            <Box pt="6">
              <FormControl color="gray.600">
                <FormLabel>Completed on</FormLabel>
                <Input
                  name="date"
                  type="datetime-local"
                  isRequired
                  defaultValue={moment().format("YYYY-MM-DDThh:mm")}
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
