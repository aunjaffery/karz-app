import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { signup, addNewUser } from "@src/fireConfig";
import { useState } from "react";
import Rocket from "@src/icons/Rocket";

const SignupPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    let email = e.target.email.value;
    let pass = e.target.password.value;
    let pass2 = e.target.password2.value;
    if (pass !== pass2) {
      toast({
        title: "Passwords do not match",
        status: "error",
        position: "top",
        duration: 1500,
      });
      setLoading(false);
      return;
    }
    try {
      const result = await signup(email, pass);
      await addNewUser(result?.user?.uid, result?.user?.email);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error?.message);
      setLoading(false);
      toast({
        title: "Failed to Signup",
        status: "error",
        position: "top",
        duration: 1500,
      });
    }
  };
  return (
    <Box h="100vh" bg="blue.600">
      <Flex
        justify="center"
        align="center"
        direction={{ base: "column", md: "row" }}
        h="100%"
      >
        <Flex
          flex={{ base: 2, md: 7 }}
          justify="center"
          align="center"
          h="100%"
        >
          <Box h={{ base: "200px", md: "100%" }} maxH="500px">
            <Rocket />
          </Box>
        </Flex>
        <Flex
          bg="bg.100"
          flex={{ base: 8, md: 3 }}
          h="100%"
          w="100%"
          align="center"
          justify="center"
          borderTopRadius={{ base: "3xl", md: "none" }}
          px="10"
        >
          <form onSubmit={onSignup}>
            <Box py="6">
              <Box>
                <Text fontSize="3xl" fontWeight="bold" color="blue.400">
                  Signup Here
                </Text>
                <Text color="gray.500">Let's join us :)</Text>
              </Box>
              <Box mt="8">
                <Text color="gray.500">Email</Text>
                <Input
                  type="email"
                  name="email"
                  minW={{ base: "300px", md: "400px" }}
                  bg="gray.200"
                  size={{ base: "md", md: "lg" }}
                  mt="2"
                  color="gray.600"
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
                  name="password"
                  minW={{ base: "200px", md: "400px" }}
                  bg="gray.200"
                  size={{ base: "md", md: "lg" }}
                  mt="2"
                  minLength={6}
                  color="gray.600"
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
                <Text color="gray.500">Retype Password</Text>
                <Input
                  type="password"
                  name="password2"
                  minW={{ base: "200px", md: "400px" }}
                  bg="gray.200"
                  size={{ base: "md", md: "lg" }}
                  mt="2"
                  minLength={6}
                  color="gray.600"
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
                  isLoading={loading}
                  _hover={{
                    bgGradient: "linear(to-r, blue.500,,blue.400, blue.300)",
                  }}
                  _active={{
                    bgGradient: "linear(to-r, blue.500,,blue.300, blue.500)",
                  }}
                  type="submit"
                >
                  Signup
                </Button>
                <Box>
                  <Link to="/login">
                    <Text
                      textAlign="center"
                      color="gray.500"
                      mt="4"
                      _hover={{ color: "blue.400" }}
                    >
                      Already have an account?
                    </Text>
                  </Link>
                </Box>
              </Box>
            </Box>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SignupPage;
