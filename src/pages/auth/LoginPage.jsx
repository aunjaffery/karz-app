import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@src/fireConfig";
import { useContext, useEffect } from "react";
import { AuthContext } from "@src/Auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser]);
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let pass = e.target.password.value;
    try {
      await login(email, pass);
      navigate("/");
    } catch (error) {
      console.log(error?.message);
      toast({
        title: "Invalid email/password",
        status: "error",
        position: "top",
        duration: 1500,
      });
    }
  };
  return (
    <Box h="100vh" bg="bg.200">
      <Flex justify="center" align="center" h="100%">
        <form onSubmit={onLoginSubmit}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold" color="blue.400">
              Here you can Login
            </Text>
            <Text color="gray.500">Let's join us :)</Text>
          </Box>
          <Box mt="8">
            <Text color="gray.500">Email</Text>
            <Input
              type="email"
              borderColor="gray.600"
              name="email"
              minW={{ base: "300px", md: "400px" }}
              bg="#1f2d29"
              size="lg"
              mt="2"
              color="gray.400"
              _focus={{
                boxShadow: "none !important",
                borderColor: "gray.500",
              }}
              _hover={{
                borderColor: "gray.500",
              }}
              isRequired={true}
            />
          </Box>
          <Box mt="5">
            <Text color="gray.500">Password</Text>
            <Input
              type="password"
              borderColor="gray.600"
              name="password"
              minW={{ base: "200px", md: "400px" }}
              bg="#1f2d29"
              size="lg"
              mt="2"
              color="gray.400"
              _focus={{
                boxShadow: "none !important",
                borderColor: "gray.500",
              }}
              _hover={{
                borderColor: "gray.500",
              }}
              isRequired={true}
            />
          </Box>
          <Box mt="10">
            <Button
              bgGradient="linear(to-r, blue.500,,blue.400, blue.300)"
              w="full"
              color="white"
              textTransform="uppercase"
              size="lg"
              _hover={{
                bgGradient: "linear(to-r, blue.500,,blue.400, blue.300)",
              }}
              _active={{
                bgGradient: "linear(to-r, blue.500,,blue.300, blue.500)",
              }}
              type="submit"
            >
              Login
            </Button>
            <Box>
              <Link to="/signup">
                <Text
                  textAlign="center"
                  color="gray.500"
                  mt="4"
                  _hover={{ color: "blue.400" }}
                >
                  Dont have account?
                </Text>
              </Link>
            </Box>
          </Box>
        </form>
      </Flex>
    </Box>
  );
};

export default LoginPage;
