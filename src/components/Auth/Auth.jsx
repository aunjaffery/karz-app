import { useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import useBoundStore from "../../store/Store";
import jwtDecode from "jwt-decode";
import { RiExchangeFundsLine } from "react-icons/ri";
import { setSession, getAccessToken } from "../../services/jwt.service";

const Auth = ({ children }) => {
  const { loginWithToken, tokenLoading, logoutService } = useBoundStore(
    (state) => state
  );

  const handleAuthentication = async () => {
    let access_token = getAccessToken();
    if (!access_token) {
      logoutService();
      return;
    }
    if (!isAuthTokenValid(access_token)) return;
    setSession(access_token);
    loginWithToken();
  };

  const isAuthTokenValid = (access_token) => {
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      logoutService();
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    handleAuthentication();
  }, []);

  return (
    <Box>
      {tokenLoading ? (
        <Flex
          h="100vh"
          w="100%"
          justify="center"
          align="center"
          direction="column"
          color="blue.400"
        >
          <RiExchangeFundsLine size="62px" />
          <Text fontSize="xl" fontWeight="bold" mt="2" textAlign="center">
            Loading...
          </Text>
        </Flex>
      ) : (
        children
      )}
    </Box>
  );
};

export default Auth;
