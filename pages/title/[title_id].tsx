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
import { TitleInterface, UserTitle } from "../../src/components/title";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

const upsertTitle = async (
  userTitle: UserTitle,
  method: string
): Promise<void> => {
  userTitle.isAdded = true;
  const resp = await fetch(`/api/movie`, {
    method: method,
    body: JSON.stringify(userTitle),
    credentials: "include",
  });
  if (resp.status === 200) {
    location.reload();
  } else {
    console.error(resp);
  }
};

const Title: React.FC = ({}) => {
  const router = useRouter();
  const { title_id } = router.query;

  const { data: title, error } = useSWR<TitleInterface>(
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

  const userTitle: UserTitle = { title: title };

  return (
    <Box p={5}>
      <HStack align="start" spacing={5}>
        <Image
          src={title.posterLink || "/placeholder_poster.png"}
          alt={title.name}
          boxSize="600px"
          objectFit="cover"
        />
        <VStack align="start" spacing={3}>
          <Heading>{title.name}</Heading>
          {/* Add more info as needed */}
          <HStack spacing={3}>
            <Button colorScheme="teal">Add to Wishlist</Button>
            <Button
              colorScheme="blue"
              onClick={() => upsertTitle(userTitle, "POST")}
            >
              Mark as Watched
            </Button>
          </HStack>
          <VStack>
            <Heading size="md" mt={5}>
              IMDB rating: {title.rating}
            </Heading>
          </VStack>
          {title.description && (
            <Box mt={5}>
              <Heading size="md">Description</Heading>
              <Text fontSize="xl" mt={2}>
                {title.description}
              </Text>
            </Box>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default Title;
