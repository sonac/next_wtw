import { Box, Image, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface SectionCardProps {
  name: string;
  imageUrl: string;
  link: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ name, imageUrl, link }) => {
  return (
    <Link href={link} passHref>
      <Box
        as="a"
        position="relative"
        overflow="hidden"
        borderRadius="md"
        boxShadow="md"
        _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
        transition="transform 0.3s, box-shadow 0.3s"
        cursor="pointer"
      >
        <Image
          src={imageUrl}
          alt={name}
          w="20vw"
          h="250px"
          mt="5vh"
          objectFit="cover"
          transition="transform 0.3s"
          _groupHover={{ transform: "scale(1.1)" }}
        />
        <Flex
          position="absolute"
          bottom="0"
          w="100%"
          bgGradient="linear(to-t, rgba(0, 0, 0, 0.7), transparent)"
          color="white"
          p={4}
          align="center"
          justify="center"
        >
          <Text fontSize="2xl" fontWeight="bold">
            {name}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};

export default SectionCard;
