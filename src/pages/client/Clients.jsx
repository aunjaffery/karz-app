import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AddClientModal from "@comp/misc/AddClientModal";
import PageTitle from "@comp/misc/PageTitle";
import { AiFillDelete } from "react-icons/ai";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, deleteClient } from "@src/fireConfig";
import { useContext, useEffect, useState } from "react";
import EmptyIcon from "@src/icons/EmptyIcon";
import DeleteClientDialog from "@comp/misc/DeleteClientDialog";
import { AuthContext } from "@src/Auth";

const Clients = () => {
  const { currentUser } = useContext(AuthContext);
  const [clientsData, setClientsData] = useState([]);
  const [delLoading, setDelLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [delId, setDelId] = useState(null);
  const toast = useToast();
  const q = query(
    collection(db, "users", currentUser?.uid, "clients"),
    orderBy("name", "asc")
  );

  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
      setClientsData(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    });
    return unsub;
  }, []);

  const {
    isOpen: isAddClientOpen,
    onOpen: onAddClientOpen,
    onClose: onAddClientClose,
  } = useDisclosure();

  const {
    isOpen: isDelClientOpen,
    onOpen: onDelClientOpen,
    onClose: onDelClientClose,
  } = useDisclosure();

  const onClientDelete = async () => {
    if (!delId && !delId.id) return;
    setDelLoading(true);
    try {
      await deleteClient(currentUser?.uid, delId.id);
      setDelLoading(false);
      onDelClientClose();
      setDelId(null);
      toast({
        title: "Client deleted successfully",
        status: "success",
        position: "top",
        duration: 1500,
      });
    } catch (error) {
      setDelLoading(false);
      toast({
        title: "Failed to delete client",
        status: "error",
        position: "top",
        duration: 1500,
      });
      console.log(error);
    }
  };

  return (
    <Box>
      <Container maxW="container.xl" h="100%">
        <PageTitle title="Clients" callback={onAddClientOpen} />
        <Box>
          {loading ? (
            <Flex w="100%" minH="400px" justify="center" align="center">
              <Spinner size="xl" color="blue.400" thickness="3px" />
            </Flex>
          ) : !clientsData.length ? (
            <Flex
              w="100%"
              minH="400px"
              justify="center"
              align="center"
              direction="column"
            >
              <Box mb="4" color="gray.400" w="300px" h="200px">
                <EmptyIcon />
              </Box>
              <Text color="gray.500" textAlign="center">
                You have no clients.
              </Text>
            </Flex>
          ) : (
            <Box pb="12">
              <SimpleGrid
                columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
                spacing="10"
              >
                {clientsData.map((x) => (
                  <PeopleCard
                    name={x.name}
                    sub={x.relation}
                    key={x.id}
                    delWarning={() => {
                      setDelId(x);
                      onDelClientOpen();
                    }}
                  />
                ))}
              </SimpleGrid>
              <Box mt="12" px="8">
                <Text color="gray.500" textAlign="center" fontSize="sm">
                  Please do not add more then 20 clients. I cannot afford to pay
                  database bills.
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
      <AddClientModal isOpen={isAddClientOpen} onClose={onAddClientClose} />
      <DeleteClientDialog
        isOpen={isDelClientOpen}
        onClose={onDelClientClose}
        triggerFunction={onClientDelete}
        name={delId?.name}
        loading={delLoading}
      />
    </Box>
  );
};

const PeopleCard = ({ name, sub, delWarning }) => {
  let svg = createAvatar(style, {
    seed: name,
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
    // ... and other options
  });
  return (
    <Flex position="relative" ml="45px">
      <Flex
        bg="green.100"
        h="90px"
        minW={{ base: "100%", sm: "200px" }}
        borderRadius="md"
        boxShadow="lg"
        overflow="hidden"
        justify="space-between"
      >
        <Box
          h="90px"
          w="90px"
          bg="white"
          borderRadius="full"
          position="absolute"
          top="0"
          left="-45px"
          boxShadow="0 0 0.5rem #babbbc"
        >
          <Box w="100%" h="100%" p="1">
            <Avatar name="Dan Abrahmov" src={svg} h="100%" w="100%" />
          </Box>
        </Box>
        <Flex
          ml="45px"
          align="center"
          h="100%"
          justify="flex-start"
          flex={1}
          minW={{ base: 0, sm: "195px" }}
        >
          <Box ml="4">
            <Text
              fontSize="lg"
              textTransform="capitalize"
              color="gray.700"
              whiteSpace="nowrap"
            >
              {name}
            </Text>
            <Text
              fontSize="xs"
              textTransform="capitalize"
              color="gray.600"
              whiteSpace="nowrap"
            >
              {sub}
            </Text>
          </Box>
        </Flex>
        <Flex bg="#fafafa" px="4" justify="center" align="center">
          <IconButton
            size="sm"
            bg="none"
            aria-label="back-btn"
            borderRadius="lg"
            _hover={{
              bg: "none",
              color: "red.400",
            }}
            _active={{
              bg: "red.100",
            }}
            onClick={delWarning}
            icon={<AiFillDelete size="20" />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Clients;
