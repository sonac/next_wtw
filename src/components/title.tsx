import { Image } from '@chakra-ui/image';
import { Flex, Box, Heading, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

export enum MediaType {
  Movie = "Movie",
  Series = "Series",
  Game = "Game"
} 

export interface Ids {
  titleId: string;
  coverId: number;
}

export interface TitleInterface {
  name: string;
  posterLink: string;
  year: number;
  rating: number;
  ratingCount: number;
  isSynced: boolean;
  description: string;
  ids: Ids;
  type: MediaType;
  isFinished: boolean;
}

export interface SeenTitle {
  title: TitleInterface;
  rating: number;
  comment: string;
  dateAdded: Date;
  dateFinished: Date;
  isFinished: boolean;
}

export interface UserResponse {
  seenMovies: Array<SeenTitle>;
}

interface MovieProps {
  st: SeenTitle;
  clickTitle: (title: SeenTitle) => void;
}

const Title: React.FC<MovieProps> = ({ st, clickTitle}: MovieProps) => {
  return (
    <Box w={"15em"}>
      <Image
        src={`${st.title.posterLink}`}
        alt={st.title.name}
        h={"20em"}
        w={"100%"}
        _hover={{
          cursor: "pointer"
        }}
        onClick={() => clickTitle(st)}
      />
      <Flex justify="space-between" p={2} flexDir="column">
        <Flex justifyContent="space-between" flexDirection="row">
          <Heading as="h3" size="md">
            {st.title.name}
          </Heading>
          <Text paddingRight={5}>{st.title.year}</Text>
          <Text >{st.title.rating}</Text>
        </Flex>
        <Flex justifyContent="space-between" flexDirection="row">
          <Text>Your rating: </Text>
          <Text fontWeight="bold" color="blue" fontSize="sm">{st.rating}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Title;
