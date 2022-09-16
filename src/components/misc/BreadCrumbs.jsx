import { Box, Breadcrumb, BreadcrumbItem, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const BreadCrumbs = ({ paths, color = "blue.400", hcolor = "blue.600" }) => {
  return (
    <Box py="6" color={color}>
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <Link to="/">
            <Flex
              gridColumnGap="1"
              justify="center"
              align="center"
              _hover={{ color: hcolor }}
            >
              <AiFillHome style={{ marginBottom: "4px" }} />
              <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>
                Home
              </Text>
            </Flex>
          </Link>
        </BreadcrumbItem>
        {paths &&
          paths.map((p) => (
            <BreadcrumbItem key={p.id}>
              {p.dis ? (
                <Text textTransform="capitalize" color={hcolor}>
                  {p.name}
                </Text>
              ) : (
                <Link to={p.path}>
                  <Text
                    cursor="pointer"
                    _hover={{ textDecoration: "underline", color: hcolor }}
                    textTransform="capitalize"
                  >
                    {p.name}
                  </Text>
                </Link>
              )}
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
    </Box>
  );
};

export default BreadCrumbs;
