import { Box, useColorModeValue } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";

const Layout = ({ children }) => {
  const location = useLocation();
  const render = () => {
    return location.pathname === "/login" || location.pathname === "/signup"
      ? true
      : false;
  };
  return (
    <Box
      minH="100vh"
      position="relative"
      bg={useColorModeValue("bg.100", "dark.100")}
    >
      {render() ? null : <MobileNav />}
      {children}
    </Box>
  );
};

export default Layout;
