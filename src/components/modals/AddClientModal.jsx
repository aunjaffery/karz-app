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
  useColorModeValue,
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
  const variant = useBreakpointValue(
    { base: "bottom", md: "right" },
    { fallback: "bottom" }
  );
  const onAddClient = async (e) => {
    e.preventDefault();
    let fullName = e.target.fullName?.value;
    let relation = e.target.relation?.value;
    if (!fullName || !relation) return;
    fullName = fullName?.toLowerCase();
    mutate({ fullName, relation });
  };

  return (
    <Drawer placement={variant} onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent
        borderTopRadius={{ base: "30px", md: "none" }}
        bg={useColorModeValue("white", "dark.200")}
      >
        <DrawerCloseButton color={useColorModeValue("white", "dark.200")} />
        <DrawerHeader borderBottomWidth="1px">Add Client</DrawerHeader>
        <form onSubmit={onAddClient}>
          <DrawerBody py="6">
            <FormControl color="gray.500">
              <FormLabel>Name</FormLabel>
              <Input
                name="fullName"
                type="text"
                maxLength={15}
                border={useColorModeValue("1px", "none")}
                color={useColorModeValue("black", "white")}
                bg={useColorModeValue("white", "dark.100")}
                isRequired
              />
            </FormControl>
            <FormControl mt="4">
              <FormLabel color="gray.500">Relation</FormLabel>
              <Select
                name="relation"
                border={useColorModeValue("1px", "none")}
                color={useColorModeValue("black", "white")}
                bg={useColorModeValue("white", "dark.100")}
                isRequired
              >
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

export default AddClientModal;
