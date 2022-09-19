import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import AddTransModal from "@comp/modals/AddTransModal";
import AllTransTab from "@comp/tabs/AllTransTab";
import PendingTransTab from "@comp/tabs/PendingTransTab";
import DoneTransTab from "@comp/tabs/DoneTransTab";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    isOpen: isAddTransOpen,
    onOpen: onAddTransOpen,
    onClose: onAddTransClose,
  } = useDisclosure();

  return (
    <Box mt="2">
      <Container maxW="container.xl" h="100%">
        {/*
		  <PageTitle
		  title="Transactions"
		  callback={onAddTransOpen}
		  isFetching={isFetching && !transLoading}
		  />
		  */}
        <Tabs
          size="md"
          variant="unstyled"
          isLazy={true}
          lazyBehavior="keepMounted"
          align="left"
        >
          <TabList>
            <Flex bg="dark.200" borderRadius="xl" p="1">
              <Tab
                _focus={{ outline: "none" }}
                color="gray.500"
                _selected={{
                  bg: "dark.400",
                  borderRadius: "xl",
                  color: "white",
                }}
              >
                All
              </Tab>
              <Tab
                _focus={{ outline: "none" }}
                color="gray.500"
                _selected={{
                  bg: "dark.400",
                  borderRadius: "xl",
                  color: "white",
                }}
              >
                Pending
              </Tab>
              <Tab
                _focus={{ outline: "none" }}
                color="gray.500"
                _selected={{
                  bg: "dark.400",
                  borderRadius: "xl",
                  color: "white",
                }}
              >
                Done
              </Tab>
            </Flex>
          </TabList>
          <TabPanels mt="6">
            <TabPanel textAlign="left" p="0">
              <AllTransTab />
            </TabPanel>
            <TabPanel textAlign="left" p="0">
              <PendingTransTab />
            </TabPanel>
            <TabPanel textAlign="left" p="0">
              <DoneTransTab />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Button onClick={onAddTransOpen}>add</Button>
      </Container>
      <AddTransModal isOpen={isAddTransOpen} onClose={onAddTransClose} />
    </Box>
  );
};

export default Dashboard;
