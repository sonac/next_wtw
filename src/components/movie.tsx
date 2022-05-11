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

/*
  * {"seenMovies":
  *   [{
  *     "movie":{ 
  *       "title": "Our Planet",
  *       "imdbId":"tt9253866",
  *       "posterLink":"https://m.media-amazon.com/images/M/MV5BN2I1ZjA5YjQtYmQ0ZS00ZmE1LTk1ZjktNTQ5ODIzY2JiZDdhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
  *       "year":2019,
  *       "rating":0,
  *       "ratingCount":0,
  *       "isSynced":false
  *     },
  *     "rating": 9,
  *     "comment":""
  *   }]
  * }
 */

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
            <Text>{movie.year}</Text>
            <Text>{movie.rating}</Text>
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
