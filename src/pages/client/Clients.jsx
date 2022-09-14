import {
  Box,
  Container,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AddClientModal from "@comp/modals/AddClientModal";
import PageTitle from "@comp/misc/PageTitle";
import { useEffect, useState } from "react";
import DeleteClientDialog from "@comp/modals/DeleteClientDialog";
import ClientCard from "@comp/cards/ClientCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NoClients from "@comp/placeholders/NoClients";
import SkeletonClient from "@comp/placeholders/SkeletonClient";
import { fetchUserClients, deleteClient } from "../../services/Apis";
import { toast } from "react-toastify";

const Clients = () => {
  const [delId, setDelId] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery(
    ["fetchUserClients"],
    fetchUserClients,
    {
      refetchOnWindowFocus: false,
      onError: () => toast.error("Error! Cannot fetch transaction"),
    }
  );

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
    <Box>
      <Container maxW="container.xl" h="100%">
        <PageTitle
          title="Clients"
          callback={onAddClientOpen}
          isFetching={isFetching && !isLoading}
        />
        <Box>
          {isLoading ? (
            <Box pb="12">
              <SimpleGrid
                columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
                spacing="10"
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
                spacing="10"
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
