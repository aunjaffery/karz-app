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
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import AddTransModal from "@comp/modals/AddTransModal";
import AllTransTab from "@comp/tabs/AllTransTab";
import PendingTransTab from "@comp/tabs/PendingTransTab";
import DoneTransTab from "@comp/tabs/DoneTransTab";
import { AiOutlinePlus } from "react-icons/ai";

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
    <Box mt={{base: 2, md: 4}}>
      <Container maxW="container.xl" h="100%">
        <Tabs
          size="md"
          variant="unstyled"
          isLazy={true}
          lazyBehavior="keepMounted"
          align="end"
        >
          <TabList>
            <Flex w="100%" justify="space-between" align="center">
              <Flex
                bg={useColorModeValue("white", "dark.200")}
                borderRadius="xl"
                boxShadow="sm"
                p="1"
              >
                <Tab
                  _focus={{ outline: "none" }}
                  color="gray.400"
                  _selected={{
                    bg: useColorModeValue("bg.100", "dark.400"),
                    borderRadius: "xl",
                    color: useColorModeValue("gray.600", "white"),
                  }}
                >
                  All
                </Tab>
                <Tab
                  _focus={{ outline: "none" }}
                  color="gray.400"
                  _selected={{
                    bg: useColorModeValue("bg.100", "dark.400"),
                    borderRadius: "xl",
                    color: useColorModeValue("gray.600", "white"),
                  }}
                >
                  Pending
                </Tab>
                <Tab
                  _focus={{ outline: "none" }}
                  color="gray.400"
                  _selected={{
                    bg: useColorModeValue("bg.100", "dark.400"),
                    borderRadius: "xl",
                    color: useColorModeValue("gray.600", "white"),
                  }}
                >
                  Done
                </Tab>
              </Flex>
              <Button
                size="sm"
                borderRadius="full"
                px="0"
                onClick={onAddTransOpen}
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
                <AiOutlinePlus size="18" />
              </Button>
            </Flex>
          </TabList>
          <TabPanels mt="5">
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
      </Container>
      <AddTransModal isOpen={isAddTransOpen} onClose={onAddTransClose} />
    </Box>
  );
};

export default Dashboard;
