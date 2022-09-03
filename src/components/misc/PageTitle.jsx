import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const PageTitle = ({ title, callback }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  if (!title) return <Flex my="8" />;
  return (
    <Flex my="12" borderBottomWidth="1px" borderBottomColor="gray.300" pb="2">
      <Flex justify="flex-start" align="center" flex="1">
        <IconButton
          size="sm"
          bg="none"
          aria-label="back-btn"
          _hover={{
            bg: "none",
          }}
          icon={<BsChevronLeft size="20" />}
          onClick={goBack}
        />
        <Text fontSize="1.4rem" fontWeight="bold">
          {title}
        </Text>
      </Flex>
      {callback ? (
        <Flex flex="1" justify="flex-end" align="center">
          <Button
            onClick={callback}
            colorScheme="green"
            mr="1"
            size={{ base: "sm", md: "md" }}
            lineHeight="0"
          >
            Add New
          </Button>
        </Flex>
      ) : (
        <Box />
      )}
    </Flex>
  );
};

export default PageTitle;
