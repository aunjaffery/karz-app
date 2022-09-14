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
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewClient } from "../../services/Apis";
import { toast } from "react-toastify";

const AddClientModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(addNewClient, {
    onSuccess: () => {
      toast.success("Client added successfully");
      onClose();
      queryClient.invalidateQueries(["fetchUserClients"]);
    },
    onError: () => toast.error("Error! Cannot create client"),
  });
  const onAddClient = async (e) => {
    e.preventDefault();
    let fullName = e.target.fullName?.value;
    let relation = e.target.relation?.value;
    if (!fullName || !relation) return;
    fullName = fullName?.toLowerCase();
    mutate({ fullName, relation });
  };

  const variant = useBreakpointValue(
    { base: "bottom", md: "right" },
    { fallback: "bottom" }
  );

  return (
    <Drawer placement={variant} onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent borderTopRadius={{ base: "xl", md: "none" }}>
        <DrawerCloseButton color="white" />
        <DrawerHeader borderBottomWidth="1px">Add Client</DrawerHeader>
        <form onSubmit={onAddClient}>
          <DrawerBody py="6">
            <FormControl color="gray.600">
              <FormLabel>Name</FormLabel>
              <Input name="fullName" type="text" maxLength={15} isRequired />
            </FormControl>
            <FormControl mt="4">
              <FormLabel color="gray.600">Relation</FormLabel>
              <Select name="relation" isRequired>
                <option value="relative">Relative</option>
                <option value="friend">Friend</option>
                <option value="colleague">Colleague</option>
                <option value="other">Other</option>
              </Select>
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
              isLoading={isLoading}
            >
              Confirm
            </Button>
            <Button colorScheme="twitter" mr={3} onClick={onClose} w="full">
              Close
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default AddClientModal;
