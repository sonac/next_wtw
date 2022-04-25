import { Image } from '@chakra-ui/image';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export interface MovieInterface {
  title: string;
  imdbId: string;
  posterLink: string;
  year: number;
  rating: number;
  ratingCount: number;
  isSynced: boolean;
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

const Movie: React.FC<MovieProps> = ({ movie }: MovieProps) => {
  return (
      <Box>
        <Image
          src={`${movie.posterLink}`}
          alt={movie.title}
          size="100%"
        />
        <Flex justify="space-between" align="center" p={2}>
          <Box>
            <Heading as="h3" size="md">
              {movie.title}
            </Heading>
            <Text>{movie.year}</Text>
          </Box>
          <Box>
            <Text fontSize="sm">{movie.rating}</Text>
          </Box>
        </Flex>
      </Box>
  );
};

export default Movie;
