import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import WeekGraph from "@comp/tabs/WeekGraph";
import MonthGraph from "@comp/tabs/MonthGraph";

const Stats = () => {
  return (
    <Box mb="4" mt="2">
      <Tabs
        size="md"
        variant="unstyled"
        isLazy={true}
        lazyBehavior="keepMounted"
        align="center"
      >
        <TabList>
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
              Week
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
              Year
            </Tab>
          </Flex>
        </TabList>
        <TabPanels mt="5">
          <TabPanel textAlign="left" p="0">
            <WeekGraph />
          </TabPanel>
          <TabPanel textAlign="left" p="0">
            <MonthGraph />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Stats;
