import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import moment from "moment";

const ExpenseDetailModal = ({ isOpen, onClose, data, onExpDeleteModal }) => {
  let formatter = Intl.NumberFormat("en");
  const variant = useBreakpointValue(
    { base: "bottom", md: "right" },
    { fallback: "bottom" }
  );

  return (
    <Drawer placement={variant} onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent
        borderTopRadius={{ base: "30px", md: "none" }}
        bg={useColorModeValue("white", "dark.200")}
      >
        <DrawerBody align="center">
          <Box py="6">
            <Flex direction="column" align="center" justify="center">
              <Box textAlign="center">
                <Text
                  fontWeight="bold"
                  fontSize="3xl"
                  textTransform="capitalize"
                  noOfLines={1}
                >
                  Rs {formatter.format(data?.amount)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {data?.expense_date
                    ? moment(data?.expense_date).format("hA ddd, Do MMM YY")
                    : "Unknown"}
                </Text>
                <Box mt="2">
                  <Text
                    fontSize="sm"
                    bg="red.400"
                    color="white"
                    textTransform="capitalize"
                    as="span"
                    px="4"
                    py="1"
                    borderRadius="full"
                  >
                    expense
                  </Text>
                </Box>
              </Box>
              <Box mt="4" textAlign="center">
                <Text fontSize="xl">Description</Text>
                <Text fontSize="md" textTransform="capitalize" color="gray.500" px="8">
                  {data?.title}
                </Text>
              </Box>
            </Flex>
            <Flex gridColumnGap="4" justifyContent="center" mt="6">
              <Button
                variant="danger"
                borderRadius="full"
                py="6"
                px="4"
                onClick={onExpDeleteModal}
              >
                <AiOutlineDelete />
              </Button>
              <Button
                colorScheme="twitter"
                onClick={onClose}
                borderRadius="full"
                py="6"
                px="4"
              >
                <AiOutlineClose />
              </Button>
            </Flex>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ExpenseDetailModal;
