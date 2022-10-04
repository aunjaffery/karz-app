import {
  Avatar,
  Box,
  Container,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorFlex from "@comp/placeholders/ErrorFlex";
import { toast } from "react-toastify";
import { getTransactionDetails } from "../../services/Apis";
import { BiTransferAlt } from "react-icons/bi";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";
import moment from "moment";

const TransDetail = () => {
  let fmt = Intl.NumberFormat("en");
  const bgColor = useColorModeValue("white", "dark.200");
  const avaBg = useColorModeValue("#f3f3f4", "#252a41");
  let { trans_id } = useParams();
  const {
    data: transaction,
    isLoading: transLoading,
    isError,
  } = useQuery(["getTransactionDetails", trans_id], getTransactionDetails, {
    refetchOnWindowFocus: false,
    onError: () => toast.error("Error! Cannot fetch transaction"),
    enabled: !!trans_id,
  });
  if (isError) {
    return <ErrorFlex />;
  }
  if (transLoading) {
    return (
      <Flex w="100%" minH="400px" justify="center" align="center">
        <Spinner size="lg" color="blue.400" />
      </Flex>
    );
  }
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
  const {
    amount,
    transaction_date,
    status,
    type,
    transactionclient,
    transactionpayment,
  } = transaction?.result;
  let svg = createAvatar(style, {
    seed: transactionclient?.fullName,
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
    backgroundColor: avaBg
  });
  return (
    <Box pb="8">
      <Container maxW="container.xl" h="100%">
        <Box my={{ base: 5, md: 10 }}>
          <Flex
            gridColumnGap="4"
            justify="space-between"
            align="flex-start"
            maxW="360px"
          >
            <Box>
              <Text fontSize="lg" textTransform="capitalize">
                {transactionclient?.fullName}
              </Text>
              <Text
                fontSize="lg"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                lineHeight="36px"
                mt="1"
              >
                <Text fontWeight="bold" fontSize="4xl" as="span">
                  {fmt.format(amount)}
                </Text>{" "}
                Rs
              </Text>
              <Text fontSize="sm" color="gray.500">
                {transaction_date
                  ? moment(transaction_date).format("ha, Do MMM YY")
                  : "_"}
              </Text>
              <Box mt="2">{statusString(status, type)}</Box>
            </Box>
            <Avatar name="Ryan Florence" size="xl" src={svg} />
          </Flex>
        </Box>
        <Box>
          <SimpleGrid columns={[1, 1, 2, 3]} spacing="3">
            {transactionpayment.map((d) => (
              <Box maxW="360px" key={d.id}>
                <Box bg={bgColor} p="1" borderRadius="lg" boxShadow="md">
                  <Flex gridColumnGap="4" w="100%">
                    <Box>
                      <Box p="3" borderRadius="lg" color="green.400">
                        <BiTransferAlt size={36} />
                      </Box>
                    </Box>
                    <Flex
                      align="center"
                      justify="space-between"
                      w="100%"
                      pr="6"
                    >
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Payment
                        </Text>
                        <Text fontSize="md">{fmt.format(d.paid_amount)}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Remain
                        </Text>
                        <Text fontSize="md">
                          {fmt.format(d.remaining_amount)}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
                <Flex w="100%" justify="flex-end" mt="1" pr="2">
                  <Text fontSize="xs" color="gray.500" fontStyle="italic">
                    {moment(d.transaction_date).format("ha, Do MMM YY")}
                  </Text>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default TransDetail;
