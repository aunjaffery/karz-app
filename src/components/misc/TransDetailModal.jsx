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
} from "@chakra-ui/react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
} from "react-icons/ai";
import moment from "moment";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";

const TransDetailModal = ({
  isOpen,
  onClose,
  data,
  onMarkCompleteModal,
  onTransDeleteModal,
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

  const statusString = (val) => {
    return (
      <Text
        fontSize="sm"
        bg={
          val === 1
            ? "red.400"
            : val === 2
            ? "green.400"
            : val === 3
            ? "yellow.400"
            : val === 4
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
        {val === 1
          ? "lent"
          : val === 2
          ? "recieved"
          : val === 3
          ? "borrowed"
          : val === 4
          ? "repaid"
          : "unknown"}
      </Text>
    );
  };
  let svg = createAvatar(style, {
    seed: data?.client,
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
      <DrawerContent borderTopRadius={{ base: "xl", md: "none" }}>
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
                  {data?.client}
                </Text>
                <Box textAlign="center" mt="1">
                  {statusString(data.status)}
                </Box>
              </Box>
              <Box mt="4">
                <Text fontSize="3xl" textAlign="center">
                  Rs {data?.amount}
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  {data?.date
                    ? moment(data?.date.toDate()).format("ddd, Do MMM hA")
                    : "Unknown"}
                </Text>
              </Box>
              <Box
                mt="4"
                display={
                  data.status === 1 || data.status === 3 ? "none" : "block"
                }
              >
                <Text fontSize="xl" textAlign="center">
                  Completed on
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  {data?.completedOn
                    ? moment(data?.completedOn.toDate()).format(
                        "ddd, Do MMM hA"
                      )
                    : "Unknown"}
                </Text>
              </Box>
            </Flex>
            <Flex gridColumnGap="6" justifyContent="center" mt="6">
              <Button
                colorScheme="green"
                type="submit"
                borderRadius="full"
                py="6"
                px="4"
                disabled={data.status === 2 || data.status === 4}
                onClick={onMarkCompleteModal}
              >
                <AiOutlineCheck />
              </Button>
              <Button
                colorScheme="red"
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
