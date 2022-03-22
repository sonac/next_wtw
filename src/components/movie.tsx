import { Image } from '@chakra-ui/image';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export interface MovieInterface {
  id: number;
  title: string;
  releaseYear: number;
  rating: number;
  posterPath: string;
  userRating: number;
}

interface MovieProps {
  movie: MovieInterface;
}

const Movie: React.FC<MovieProps> = ({ movie }: MovieProps) => {
  return (
      <Box>
        <Image
          src={`${movie.posterPath}`}
          alt={movie.title}
          size="100%"
        />
        <Flex justify="space-between" align="center" p={2}>
          <Box>
            <Heading as="h3" size="md">
              {movie.title}
            </Heading>
            <Text>{movie.releaseYear}</Text>
          </Box>
          <Box>
            <Text fontSize="sm">{movie.rating}</Text>
          </Box>
        </Flex>
      </Box>
  );
};

export default Movie;