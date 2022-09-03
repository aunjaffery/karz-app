import {
  Box,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AddTransModal from "@comp/misc/AddTransModal";
import TransDetailModal from "@comp/misc/TransDetailModal";
import MarkCompModal from "@comp/misc/MarkCompModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@src/Auth";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {
  AiFillCheckCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillQuestionCircle,
} from "react-icons/ai";
import { BiRedo } from "react-icons/bi";
import EmptyIcon from "@src/icons/EmptyIcon";
import PageTitle from "@comp/misc/PageTitle";
import DeleteClientDialog from "@comp/misc/DeleteClientDialog";
import moment from "moment";
import { db, markTransComplete, deleteTransaction } from "@src/fireConfig";

const Dashboard = () => {
  //1 = lent; 2 = recieved; 3 = borrowed; 4 = repaid;
  const { currentUser } = useContext(AuthContext);
  const [transData, setTransData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    isOpen: isAddTransOpen,
    onOpen: onAddTransOpen,
    onClose: onAddTransClose,
  } = useDisclosure();
  const q = query(
    collection(db, "users", currentUser?.uid, "transactions"),
    orderBy("date", "desc"),
    limit(25)
  );
  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
      setTransData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
    return unsub;
  }, []);
  const addNewBtn = () => {
    onAddTransOpen();
  };
  return (
    <Box>
      <Container maxW="container.xl" h="100%">
	  <PageTitle title="Transactions" callback={addNewBtn}/>
        {loading ? (
          <Flex w="100%" minH="400px" justify="center" align="center">
            <Spinner size="xl" color="blue.400" thickness="3px" />
          </Flex>
        ) : !transData.length ? (
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
              You have no transactions.
            </Text>
          </Flex>
        ) : (
          <Box pb="12">
            <SimpleGrid columns={[1, 1, 2, 3]} spacing="6">
              {transData.map((d) => (
                <TransactionCard
                  data={d}
                  key={d.id}
                  auth_id={currentUser?.uid}
                />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
      <AddTransModal isOpen={isAddTransOpen} onClose={onAddTransClose} />
    </Box>
  );
};

const TransactionCard = ({ data, auth_id }) => {
  const [markLoading, setMarkLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();
  const {
    isOpen: isMarkOpen,
    onOpen: onMarkOpen,
    onClose: onMarkClose,
  } = useDisclosure();
  const {
    isOpen: isDelTransOpen,
    onOpen: onDelTransOpen,
    onClose: onDelTransClose,
  } = useDisclosure();

  const onMarkCompleteModal = () => {
    onDetailClose();
    if (data?.id) {
      onMarkOpen();
    }
  };
  const onTransDeleteModal = () => {
    onDetailClose();
    if (data?.id) {
      onDelTransOpen();
    }
  };
  const onTransDelete = async () => {
    if (!data?.id) return;
    setDelLoading(true);
    try {
      await deleteTransaction(auth_id, data.id);
      setDelLoading(false);
      onDelTransClose();
    } catch (error) {
      console.log(error);
      setDelLoading(false);
    }
  };

  const onMarkComplete = async (date) => {
    if (!data?.id || !date) return;
    setMarkLoading(true);
    try {
      await markTransComplete(auth_id, data.id, date);
      setMarkLoading(false);
      onMarkClose();
    } catch (error) {
      console.log(error);
      setMarkLoading(false);
    }
  };

  const { id, client, amount, date, status, completedOn } = data;
  const colorSelector = (base, status) => {
    if (status === 1) {
      return base === "fg" ? "red.400" : "red.100";
    }
    if (status === 2) {
      return base === "fg" ? "green.400" : "green.100";
    }
    if (status === 3) {
      return base === "fg" ? "yellow.400" : "yellow.100";
    }
    if (status === 4) {
      return base === "fg" ? "blue.400" : "blue.100";
    }
    return base === "fg" ? "gray.400" : "gray.100";
  };
  return (
    <Box
      maxW="360px"
      bg="white"
      p="1"
      borderRadius="lg"
      boxShadow="md"
      key={id}
      onClick={onDetailOpen}
    >
      <Flex gridColumnGap="4" w="100%">
        <Box>
          <Flex
            color={colorSelector("fg", status)}
            bg={colorSelector("bg", status)}
            p="3"
            borderRadius="lg"
          >
            {status === 1 ? (
              <AiFillMinusCircle size="42" />
            ) : status === 2 ? (
              <AiFillCheckCircle size="42" />
            ) : status === 3 ? (
              <AiFillPlusCircle size="42" />
            ) : status === 4 ? (
              <BiRedo size="42" />
            ) : (
              <AiFillQuestionCircle size="42" />
            )}
          </Flex>
        </Box>
        <Flex justify="space-between" w="100%" pr="2">
          <Flex direction="column" justify="space-evenly">
            <Text fontWeight="bold" textTransform="capitalize">
              {client}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {date ? moment(date.toDate()).format("DD MMM") : "_"}
            </Text>
          </Flex>
          <Flex direction="column" justify="space-evenly">
            <Text fontWeight="bold" color={colorSelector("fg", status)}>
              Rs {amount}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {completedOn
                ? moment(completedOn.toDate()).format("DD MMM")
                : "_"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <TransDetailModal
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        data={data}
        onMarkCompleteModal={onMarkCompleteModal}
        onTransDeleteModal={onTransDeleteModal}
      />
      <MarkCompModal
        isOpen={isMarkOpen}
        onClose={onMarkClose}
        onMarkComplete={onMarkComplete}
        markLoading={markLoading}
      />
      <DeleteClientDialog
        isOpen={isDelTransOpen}
        onClose={onDelTransClose}
        triggerFunction={onTransDelete}
        loading={delLoading}
        name="Transaction"
      />
    </Box>
  );
};

export default Dashboard;
