import { Image } from '@chakra-ui/image';
import { Flex, Box, Heading, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

export interface TitleInterface {
  dateAdded: string;
  title: string;
  imdbId: string;
  posterLink: string;
  year: number;
  rating: number;
  ratingCount: number;
  isSynced: boolean;
  description: string;
}

export interface SeenTitle {
  title: TitleInterface;
  rating: number;
  comment: string;
}

export interface UserResponse {
  seenMovies: Array<SeenTitle>;
}

interface MovieProps {
  movie: TitleInterface;
  rating: number;
}

const Title: React.FC<MovieProps> = ({ movie, rating }: MovieProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
      <Box w={"15em"}>
        <Image
          src={`${movie.posterLink}`}
          alt={movie.title}
          h={"20em"}
          w={"100%"}
          _hover={{
            cursor: "pointer"
          }}
          onClick={onOpen}
        />
        <Flex justify="space-between" p={2} flexDir="column">
          <Flex justifyContent="space-between" flexDirection="row">
            <Heading as="h3" size="md">
              {movie.title}
            </Heading>
            <Text paddingRight={5}>{movie.year}</Text>
            <Text >{movie.rating}</Text>
          </Flex>
          <Flex justifyContent="space-between" flexDirection="row">
            <Text>Your rating: </Text>
            <Text fontWeight="bold" color="blue" fontSize="sm">{rating}</Text>
          </Flex>
        </Flex>
      </Box>
  );
};

export default Title;
