import { Box, Container, Flex, IconButton, Text } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { RiExchangeFundsLine } from "react-icons/ri";

const Navbar = () => {
  const onLogout = async () => {
    try {
		//Logout call
      console.log("Signout Successfull");
    } catch (error) {
      console.log(error.message);
      console.log("Signout failed");
    }
  };
  return (
    <Box bg="gray.800" h="60px">
      <Container maxW="container.xl" h="100%">
        <Flex align="center" h="100%" px="2" justify="space-between">
          <Box flex="1">
            <Link to="/">
              <Flex
                justify="flex-start"
                align="center"
                _hover={{ color: "blue.300" }}
                color="blue.400"
                gridColumnGap="1"
              >
                <Box mb="3px">
                  <RiExchangeFundsLine size="32px" />
                </Box>
                <Text
                  fontWeight="bold"
                  fontSize="3xl"
                  display={{ base: "none", md: "block" }}
                >
                  Finance
                </Text>
              </Flex>
            </Link>
          </Box>
          <Flex justify="flex-end" align="center" flex="1" gridColumnGap="3">
            <NavLink to="/clients">
              {({ isActive }) => (
                <Text
                  color={isActive ? "blue.200" : "white"}
                  ml="6"
                  _hover={{ color: "blue.300" }}
                >
                  Clients
                </Text>
              )}
            </NavLink>
            <IconButton
              size="sm"
              bg="none"
              aria-label="logout-btn"
              color="white"
              borderRadius="lg"
              _hover={{
                bg: "none",
                color: "red.400",
              }}
              _active={{
                color: "red.600",
              }}
              icon={<FiLogOut size="20" />}
              onClick={onLogout}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
