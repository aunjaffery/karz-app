import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Input,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";
import { AiFillEdit } from "react-icons/ai";
import ErrorFlex from "@comp/placeholders/ErrorFlex";
import useBoundStore from "@src/store/Store";
import { useMutation } from "@tanstack/react-query";
import { changeUserPass, updateUserName } from "../../services/Apis";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    isOpen: nameIsOpen,
    onOpen: nameOnOpen,
    onClose: nameOnClose,
  } = useDisclosure();
  const {
    isOpen: passIsOpen,
    onOpen: passOnOpen,
    onClose: passOnClose,
  } = useDisclosure();

  const { user, loginWithToken } = useBoundStore((state) => state);

  const { mutate: mutateName, isLoading: nameLoading } = useMutation(
    updateUserName,
    {
      onSuccess: () => {
        toast.success("Name Updated successfully");
        loginWithToken();
        nameOnClose();
      },
      onError: () => toast.error("Error! Cannot update user"),
    }
  );
  const { mutate: mutatePass, isLoading: passLoading } = useMutation(
    changeUserPass,
    {
      onSuccess: () => {
        toast.success("Password Updated successfully");
        passOnClose();
      },
      onError: () => toast.error("Error! Cannot update password"),
    }
  );

  const avaBg = useColorModeValue("#f3f3f4", "#252a41");
  const avaBorder = useColorModeValue("gray.400", "gray.200");
  const avaBorderWidth = useColorModeValue("0", "2px");

  const tborder = useColorModeValue("1px", "none");
  const tcolor = useColorModeValue("black", "white");
  const tbg = useColorModeValue("white", "dark.200");
  if (!user) {
    return <ErrorFlex />;
  }
  let svg = createAvatar(style, {
    seed: user?.fullName,
    dataUri: true,
    hair: [
      "short01",
      "short02",
      "short03",
      "short04",
      "short05",
      "short06",
      "short07",
      "short08",
      "short09",
      "short10",
    ],
    backgroundColor: avaBg,
  });

  const updateName = (e) => {
    e.preventDefault();
    mutateName({ fullName: e.target?.fullName?.value });
  };
  const changePassword = (e) => {
    e.preventDefault();
    let data = {
      oldPass: e.target?.oldPass?.value,
      newPass: e.target?.newPass?.value,
      newPass2: e.target?.newPass2?.value,
    };
    if (data.newPass !== data.newPass2) {
      toast.error("Passwords do not match");
      return;
    }
    mutatePass(data);
  };
  return (
    <Box mt="2">
      <Container maxW="container.xl" h="100%">
        <Box
          borderBottomWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          pb="5"
        >
          <Flex gridColumnGap="4" align="center">
            <Avatar
              name="Ryan Florence"
              size="xl"
              src={svg}
              borderWidth={avaBorderWidth}
              borderColor={avaBorder}
            />
            <Box>
              <Text fontSize="lg" textTransform="capitalize" fontWeight="bold">
                {user?.fullName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {user?.email}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box pt="8">
          <Box>
            <Flex
              justify="space-between"
              align="center"
              color="gray.500"
              gridColumnGap="2"
            >
              <Text>Name</Text>
              {!nameIsOpen && (
                <Box>
                  <IconButton
                    aria-label="change-name"
                    size="sm"
                    icon={<AiFillEdit size="18" />}
                    onClick={nameOnOpen}
                  />
                </Box>
              )}
            </Flex>
            {nameIsOpen ? (
              <Box mt="2">
                <form onSubmit={updateName}>
                  <Box>
                    <Input
                      defaultValue={user?.fullName}
                      maxW="340px"
                      border={tborder}
                      color={tcolor}
                      bg={tbg}
                      name="fullName"
                      type="text"
                      maxLength={15}
                      isRequired
                    />
                  </Box>
                  <Flex gridColumnGap="4" mt="4">
                    <Button
                      variant="grass"
                      size="sm"
                      type="submit"
                      disabled={nameLoading}
                      isLoading={nameLoading}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={nameOnClose}
                      variant="danger"
                      size="sm"
                      disabled={nameLoading}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </form>
              </Box>
            ) : (
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  {user?.fullName}
                </Text>
              </Box>
            )}
          </Box>
          <Box mt="6">
            <Flex color="gray.500">
              <Text>Email</Text>
            </Flex>
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                {user?.email}
              </Text>
            </Box>
          </Box>
          <Box mt="6">
            <Flex
              justify="space-between"
              align="center"
              color="gray.500"
              gridColumnGap="2"
            >
              <Text>Password</Text>
              {!passIsOpen && (
                <Box>
                  <IconButton
                    aria-label="change-pass"
                    size="sm"
                    icon={<AiFillEdit size="18" />}
                    onClick={passOnOpen}
                  />
                </Box>
              )}
            </Flex>
            {passIsOpen ? (
              <Box mt="2">
                <form onSubmit={changePassword}>
                  <Box>
                    <Input
                      maxW="340px"
                      border={tborder}
                      color={tcolor}
                      bg={tbg}
                      name="oldPass"
                      type="password"
                      minLength={6}
                      maxLength={10}
                      placeholder="Old password"
                      isRequired
                    />
                    <Input
                      maxW="340px"
                      border={tborder}
                      color={tcolor}
                      bg={tbg}
                      name="newPass"
                      type="password"
                      minLength={6}
                      maxLength={10}
                      placeholder="New password"
                      my="4"
                      isRequired
                    />
                    <Input
                      maxW="340px"
                      border={tborder}
                      color={tcolor}
                      bg={tbg}
                      name="newPass2"
                      minLength={6}
                      maxLength={10}
                      placeholder="Retype password"
                      type="password"
                      isRequired
                    />
                  </Box>
                  <Flex gridColumnGap="4" mt="4">
                    <Button
                      type="submit"
                      variant="grass"
                      size="sm"
                      disabled={passLoading}
                      isLoading={passLoading}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={passOnClose}
                      variant="danger"
                      size="sm"
                      disabled={passLoading}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </form>
              </Box>
            ) : (
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  ******
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
