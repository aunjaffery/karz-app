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
  Select,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { addNewClient } from "@src/fireConfig";
import { useContext, useState } from "react";
import { AuthContext } from "@src/Auth";

const AddClientModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { currentUser } = useContext(AuthContext);
  const [addLoading, setAddLoading] = useState(false);
  const variant = useBreakpointValue(
    {
      base: "bottom",
      md: "right",
    },
    {
      fallback: "bottom",
    }
  );
  const onAddClient = async (e) => {
    e.preventDefault();
    let name = e.target.name?.value;
    let relation = e.target.relation?.value;
    if (!name || !relation) return;
    name = name?.toLowerCase();
    setAddLoading(true);
    try {
      await addNewClient(name, relation, currentUser?.uid);
      setAddLoading(false);
      onClose();
      toast({
        title: "Client Added successfully",
        status: "success",
        position: "top",
        duration: 1500,
      });
    } catch (error) {
      console.log(error);
      setAddLoading(false);
      toast({
        title: "Failed to add client",
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
        <DrawerHeader borderBottomWidth="1px">Add Client</DrawerHeader>
        <form onSubmit={onAddClient}>
          <DrawerBody py="6">
            <FormControl color="gray.600">
              <FormLabel>Name</FormLabel>
              <Input name="name" type="text" maxLength={15} isRequired />
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
              isLoading={addLoading}
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
