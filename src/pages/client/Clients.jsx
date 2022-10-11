import {
  Box,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddClientModal from "@comp/modals/AddClientModal";
import DeleteClientDialog from "@comp/modals/DeleteClientDialog";
import ClientCard from "@comp/cards/ClientCard";
import NoClients from "@comp/placeholders/NoClients";
import SkeletonClient from "@comp/placeholders/SkeletonClient";
import { fetchUserClients, deleteClient } from "../../services/Apis";
import { AiOutlineUserAdd } from "react-icons/ai";
import useBoundStore from "@src/store/Store";

const Clients = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [delId, setDelId] = useState(null);
  const { setTransFetching } = useBoundStore((state) => state);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery(
    ["fetchUserClients"],
    fetchUserClients,
    {
      refetchOnWindowFocus: false,
      onError: () => toast.error("Error! Cannot fetch transaction"),
    }
  );
  useEffect(() => {
    setTransFetching(isFetching);
    return () => setTransFetching(false);
  }, [isFetching]);

  const { mutate: onDelete, isLoading: delLoading } = useMutation(
    deleteClient,
    {
      onSuccess: () => {
        toast.success("Client deleted successfully");
        onDelClientClose();
        queryClient.invalidateQueries(["fetchUserClients"]);
      },
      onError: () => toast.error("Error! Cannot delete client"),
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
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
    onDelete(delId?.id);
  };

  return (
    <Box mt={{ base: 1, md: 4 }}>
      <Container maxW="container.xl" h="100%">
        {/*
		  <PageTitle
		  title="Clients"
		  callback={onAddClientOpen}
		  isFetching={isFetching && !isLoading}
		  />
		  */}
        <Flex justify="flex-end" align="center" mb="6">
          <Button
            size="sm"
            px="4"
            borderRadius="full"
            onClick={onAddClientOpen}
            bg={useColorModeValue("green.400", "dark.200")}
            color={useColorModeValue("white", "green.400")}
            _hover={{
              bg: "green.500",
              color: "white",
            }}
            _active={{
              bg: "green.600",
              color: "white",
            }}
          >
            <AiOutlineUserAdd
              size="15"
              style={{ marginRight: "2px", marginBottom: "1px" }}
            />
            New
          </Button>
        </Flex>
        <Box>
          {isLoading ? (
            <Box pb="12">
              <SimpleGrid
                columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
                spacing="6"
              >
                {[1, 2, 3, 4].map((x) => (
                  <SkeletonClient key={x} />
                ))}
              </SimpleGrid>
              <Box mt="12" px="8">
                <Text color="gray.500" textAlign="center" fontSize="sm">
                  Please do not add more than 20 clients. I cannot afford to pay
                  database bills.
                </Text>
              </Box>
            </Box>
          ) : !data?.result.length ? (
            <NoClients />
          ) : (
            <Box pb="12">
              <SimpleGrid
                columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
                spacing="6"
              >
                {data?.result.map((x) => (
                  <ClientCard
                    fullName={x.fullName}
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
        fullName={delId?.fullName}
        loading={delLoading}
      />
    </Box>
  );
};

export default Clients;
