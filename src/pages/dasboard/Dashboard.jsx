import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import AddTransModal from "@comp/modals/AddTransModal";
import PageTitle from "@comp/misc/PageTitle";
import BreadCrumbs from "@comp/misc/BreadCrumbs";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../services/Apis";
import TransactionCard from "@comp/cards/TransactionCard";
import NoTransactions from "@comp/placeholders/NoTransactions";
import SkeletonTransaction from "@comp/placeholders/SkeletonTransaction";
import { toast } from "react-toastify";

const Dashboard = () => {
  //1 = lent; 2 = recieved; 3 = borrowed; 4 = repaid;
  const {
    data: transactions,
    isLoading: transLoading,
    isFetching,
  } = useQuery(["fetchTransactions"], fetchTransactions, {
    refetchOnWindowFocus: false,
    onError: () => toast.error("Error! Cannot fetch transaction"),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    isOpen: isAddTransOpen,
    onOpen: onAddTransOpen,
    onClose: onAddTransClose,
  } = useDisclosure();

  return (
    <Box>
      <Container maxW="container.xl" h="100%">
        <BreadCrumbs />
        {/*
		  <PageTitle
		  title="Transactions"
		  callback={onAddTransOpen}
		  isFetching={isFetching && !transLoading}
		  />
		  */}
        {transLoading ? (
          <Box pb="12">
            <SimpleGrid columns={[1, 1, 2, 3]} spacing="6">
              {[1, 2, 3, 4].map((x) => (
                <SkeletonTransaction key={x} />
              ))}
            </SimpleGrid>
          </Box>
        ) : !transactions?.result.length ? (
          <NoTransactions />
        ) : (
          <Box pb="12">
            <SimpleGrid columns={[1, 1, 2, 3]} spacing="3">
              {transactions?.result.map((d) => (
                <TransactionCard data={d} key={d.id} />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
      <AddTransModal isOpen={isAddTransOpen} onClose={onAddTransClose} />
    </Box>
  );
};

export default Dashboard;
