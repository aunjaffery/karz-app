import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { signup, addNewUser } from "@src/fireConfig";
import { useState } from "react";

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
    <Box h="100vh" bg="bg.200">
      <Flex justify="center" align="center" h="100%">
        <form onSubmit={onSignup}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold" color="blue.400">
              Here you can Signup
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
              minLength={6}
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
            <Text color="gray.500">Retype Password</Text>
            <Input
              type="password"
              borderColor="gray.600"
              name="password2"
              minW={{ base: "200px", md: "400px" }}
              bg="#1f2d29"
              size="lg"
              mt="2"
              minLength={6}
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
        </form>
      </Flex>
    </Box>
  );
};

export default SignupPage;
