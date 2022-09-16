import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

function DeleteClientDialog({
  isOpen,
  onClose,
  triggerFunction,
  fullName,
  loading,
}) {
  const variant = useBreakpointValue(
    { base: "bottom", md: "right" },
    { fallback: "bottom" }
  );

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
        <DrawerHeader borderBottomWidth="1px" textTransform="capitalize">
          Delete {fullName}
        </DrawerHeader>
        <DrawerBody py="6">
          <Text  fontSize={{ base: "md", md: "lg" }}>
            Are you sure? You can't undo this action afterwards.
          </Text>
        </DrawerBody>
        <DrawerFooter
          flexDirection="column"
          alignItems="flex-start"
          gridGap="3"
        >
          <Button
            variant="danger"
            w="full"
            onClick={triggerFunction}
            isLoading={loading}
          >
            Delete
          </Button>
          <Button variant="success" mr={3} onClick={onClose} w="full">
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
export default DeleteClientDialog;
