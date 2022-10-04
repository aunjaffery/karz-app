import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import PieChart from "@comp/charts/PieChart";
import ErrorFlex from "@comp/placeholders/ErrorFlex";
import { getChartData } from "../../services/Apis";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const Stats = () => {
  const {
    data: chartData,
    isLoading: chartLoading,
    isError,
  } = useQuery(["getChartData"], getChartData, {
    refetchOnWindowFocus: false,
    onError: () => toast.error("Error! Cannot fetch chart data"),
  });
  if (isError) {
    return <ErrorFlex />;
  }
  if (chartLoading) {
    return (
      <Flex w="100%" minH="400px" justify="center" align="center">
        <Spinner size="lg" color="blue.400" />
      </Flex>
    );
  }
  return (
    <Box mt="8">
      <Box px="4">
        <Box w="100%" maxW="500px" mx="auto">
          <PieChart chartData={chartData?.result} />
        </Box>
      </Box>
      <Container maxW="container.xl" h="100%"></Container>
    </Box>
  );
};

export default Stats;
