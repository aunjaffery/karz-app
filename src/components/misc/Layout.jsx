import { Box, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  const location = useLocation();
  const [is768] = useMediaQuery("(min-width: 768px)");

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
      {render() ? null : <MobileNav display={is768} />}
      <Box pb={render() ? "0" : "70px"}>{children}</Box>
      {is768 ? null : render() ? null : <BottomNav />}
    </Box>
  );
};

export default Layout;
