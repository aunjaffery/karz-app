import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@src/fireConfig";
import { Flex, Text } from "@chakra-ui/react";
import { RiExchangeFundsLine } from "react-icons/ri";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (fireUser) => {
      setCurrentUser(fireUser);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Flex h="100vh" w="100%" justify="center" align="center" direction="column" color="blue.400">
        <RiExchangeFundsLine size="62px" />
        <Text fontSize="xl" fontWeight="bold" mt="2" textAlign="center">
          Loading...
        </Text>
      </Flex>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
