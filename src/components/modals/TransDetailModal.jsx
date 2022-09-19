import {
  Avatar,
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
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
} from "react-icons/ai";
import moment from "moment";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";
import { Link } from "react-router-dom";

const TransDetailModal = ({
  isOpen,
  onClose,
  data,
  onMarkCompleteModal,
  onTransDeleteModal,
}) => {
  const variant = useBreakpointValue(
    { base: "bottom", md: "right" },
    { fallback: "bottom" }
  );

  const statusString = (val, type) => {
    return (
      <Text
        fontSize="sm"
        bg={
          (val === 0 || val === 2) && type === "lent"
            ? "red.400"
            : val === 1 && type === "lent"
            ? "green.400"
            : (val === 0 || val === 2) && type === "borrowed"
            ? "yellow.400"
            : val === 1 && type === "borrowed"
            ? "blue.400"
            : "gray.400"
        }
        color="white"
        textAlign="center"
        textTransform="capitalize"
        as="span"
        px="4"
        py="1"
        borderRadius="full"
      >
        {val === 0 && type === "lent"
          ? "lent"
          : val === 1 && type === "lent"
          ? "recieved"
          : val === 0 && type === "borrowed"
          ? "borrowed"
          : val === 1 && type === "borrowed"
          ? "repaid"
          : val === 2
          ? "partial"
          : "unknown"}
      </Text>
    );
  };
  let svg = createAvatar(style, {
    seed: data?.transactionclient?.fullName,
    dataUri: true,
    hair: [
      "short01",
      "short02",
      "short03",
      "short04",
      "short05",
      "short06",
      "short07",
      "short08",
      "short09",
      "short10",
    ],
    backgroundColor: "#f3f3f4",
  });
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
              <Avatar name="Ryan Florence" size="xl" src={svg} />
              <Box mt="4">
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  textAlign="center"
                  textTransform="capitalize"
                >
                  {data?.transactionclient?.fullName}
                </Text>
                <Box textAlign="center" mt="1">
                  {statusString(data.status, data.type)}
                </Box>
                <Box mt="2">
                  <Link to={`/transaction/${data?.id}`}>
                    <Text
                      fontSize="sm"
                      color="blue.400"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                    >
                      View details
                    </Text>
                  </Link>
                </Box>
              </Box>
              <Box mt="3">
                <Text fontSize="3xl" textAlign="center">
                  Rs {data?.amount}
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  {data?.transaction_date
                    ? moment(data?.transaction_date).format("ddd, Do MMM hA")
                    : "Unknown"}
                </Text>
              </Box>
              <Box mt="4" display={data.status === 1 ? "none" : "block"}>
                <Text fontSize="xl" textAlign="center">
                  Remaining
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  Rs {data?.remaining_amount}
                </Text>
              </Box>
              <Box mt="4" display={data.status === 1 ? "block" : "none"}>
                <Text fontSize="xl" textAlign="center">
                  Completed on
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  {data?.last_transaction
                    ? moment(data?.last_transaction).format("ddd, Do MMM hA")
                    : "Unknown"}
                </Text>
              </Box>
            </Flex>
            <Flex gridColumnGap="6" justifyContent="center" mt="6">
              <Button
                variant="grass"
                type="submit"
                borderRadius="full"
                py="6"
                px="4"
                disabled={data.status === 1}
                onClick={onMarkCompleteModal}
              >
                <AiOutlineCheck />
              </Button>
              <Button
                variant="danger"
                borderRadius="full"
                py="6"
                px="4"
                onClick={onTransDeleteModal}
              >
                <AiOutlineDelete />
              </Button>
              <Button
                colorScheme="twitter"
                mr={3}
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

export default TransDetailModal;
