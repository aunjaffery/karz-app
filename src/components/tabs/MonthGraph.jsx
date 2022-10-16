import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import BarChart from "@comp/charts/BarChart";
import ErrorFlex from "@comp/placeholders/ErrorFlex";
import NoGraphData from "@comp/placeholders/NoGraphData";
import { getMonthlyExp } from "../../services/Apis";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const MonthGraph = () => {
  const {
    data: chartData,
    isLoading: chartLoading,
    isError,
  } = useQuery(["getMonthlyExp", moment().utcOffset()], getMonthlyExp, {
    refetchOnWindowFocus: false,
    onError: () => toast.error("Error! Cannot fetch chart data"),
  });
  if (isError) {
    return <ErrorFlex />;
  }
  if (chartLoading) {
    return (
      <Flex w="100%" minH="260px" justify="center" align="center">
        <Spinner size="lg" color="blue.400" />
      </Flex>
    );
  }
  if (!chartData?.result) {
    return <NoGraphData />;
  }
  return (
    <Box px="4">
      <Box w="100%" maxW="800px" mx="auto" h="100%" minH="300px">
        <BarChart
          labels={chartData?.result?.labels.map((x) =>
            moment(x, "MM-YYYY").format("MMM")
          )}
          values={chartData?.result?.vals}
        />
      </Box>
    </Box>
  );
};

export default MonthGraph;
