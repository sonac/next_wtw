import { Image } from '@chakra-ui/image';
import { Flex, Box, Heading, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

export interface MovieInterface {
  title: string;
  imdbId: string;
  posterLink: string;
  year: number;
  rating: number;
  ratingCount: number;
  isSynced: boolean;
  description: string;
}

export interface SeenMovie {
  movie: MovieInterface;
  rating: number;
  comment: string;
}

export interface UserResponse {
  seenMovies: Array<SeenMovie>;
}

interface MovieProps {
  movie: MovieInterface;
  rating: number;
}

const Movie: React.FC<MovieProps> = ({ movie, rating }: MovieProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
      <Box>
        <Image
          src={`${movie.posterLink}`}
          alt={movie.title}
          size="100%"
          boxSize="100%"
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

export default Movie;
