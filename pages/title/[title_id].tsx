"use client";

import { useRouter } from "next/router";
import useSWR from "swr";
import {
  Box,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { TitleInterface } from "../../src/components/title";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

const Title: React.FC = ({}) => {
  const router = useRouter();
  const { title_id } = router.query;

  console.log(title_id);

  const { data: title, error } = useSWR(
    title_id ? `/api/movie/${title_id}` : null,
    fetcher
  );

  if (error)
    return (
      <Center>
        <Text>Failed to load data</Text>
      </Center>
    );
  if (!title)
    return (
      <Center>
        <Spinner />
      </Center>
    );
  else {
    console.log(title);
  }

  return (
    <Box p={5}>
      <HStack align="start" spacing={5}>
        <Image
          src={title.posterLink || "/placeholder_poster.png"}
          alt={title.name}
          boxSize="300px"
          objectFit="cover"
        />
        <VStack align="start" spacing={3}>
          <Heading>{title.name}</Heading>
          {title.releaseDate && <Text>Release Date: {title.releaseDate}</Text>}
          {title.genre && <Text>Genre: {title.genre}</Text>}
          {title.director && <Text>Director: {title.director}</Text>}
          {/* Add more info as needed */}
          <HStack spacing={3}>
            <Button colorScheme="teal">Add to Wishlist</Button>
            <Button colorScheme="blue">Mark as Watched</Button>
          </HStack>
        </VStack>
      </HStack>
      {title.description && (
        <Box mt={5}>
          <Heading size="md">Description</Heading>
          <Text mt={2}>{title.description}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Title;
