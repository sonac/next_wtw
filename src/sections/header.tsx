import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Link as ChakraLink,
  Spacer,
  Text,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import useSWR from "swr";

import Auth from "../components/auth";
import { userFetcher } from "../data/user";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: authOpen,
    onOpen: authOnOpen,
    onClose: authOnClose,
  } = useDisclosure();
  const { data, error } = useSWR("auth", userFetcher);
  const isAuthenticated = !(data === null || data === undefined);

  const tobase64 = (s: string) => {
    return Buffer.from(s).toString("base64");
  };

  const navLinks = [
    { name: "Discover", path: `/discover/${tobase64(data || "")}` },
    { name: "Movies", path: `/movies/${tobase64(data || "")}` },
    { name: "Series", path: `/series/${tobase64(data || "")}` },
    { name: "Games", path: `/games/${tobase64(data || "")}` },
    { name: "Books", path: `/books/${tobase64(data || "")}` },
    { name: "Animes", path: `/animes/${tobase64(data || "")}` },
  ];

  return (
    <>
      <Box
        as="header"
        width="100%"
        boxShadow="md"
        position="fixed"
        top="0"
        zIndex="1000"
        h="6vh"
      >
        <HStack
          maxW="1200px"
          mx="auto"
          px={4}
          justify="space-between"
          align="center"
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            cursor="pointer"
            onClick={() => (window.location.href = "/")}
          >
            My List (the best one)
          </Text>

          <Divider orientation="vertical" height="6vh" />

          <HStack spacing={6} justify="space-between" align="center">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} passHref>
                <ChakraLink
                  fontSize="2xl"
                  _hover={{ textDecoration: "none", color: "teal.500" }}
                >
                  {link.name}
                </ChakraLink>
              </Link>
            ))}
          </HStack>

          <Divider orientation="vertical" height="6vh" />

          <Text
            fontSize="lg"
            _hover={{ cursor: "pointer", color: "teal.500" }}
            onClick={authOnOpen}
          >
            {isAuthenticated ? data : "LOGIN"}
          </Text>
        </HStack>
      </Box>

      {/* Spacer to prevent content from being hidden behind the fixed header */}
      <Box height="70px" />
      <Auth isOpen={authOpen} onClose={authOnClose} />
    </>
  );
};

export default Header;
