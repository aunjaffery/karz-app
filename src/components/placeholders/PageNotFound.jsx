import NotFound from "@src/icons/NotFound";
import { Box, Flex, Text } from "@chakra-ui/react";

const PageNotFound = () => {
	return (
    <Flex
      w="100%"
      minH="400px"
      justify="center"
      align="center"
      direction="column"
    >
      <Box minW="350px" mb="6" px="8">
        <NotFound />
      </Box>
      <Text color="#a1adb7" textAlign="center">
		Page not found.
      </Text>
    </Flex>
	)
}

export default PageNotFound
