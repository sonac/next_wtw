import { Image } from "@chakra-ui/image";
import { Flex, Box, Heading, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";

export enum MediaType {
  Movie = "Movie",
  Series = "Series",
  Game = "Game",
  Anime = "Anime",
}

export interface Ids {
  titleId: string;
  coverId: number;
  imdb: string;
}

export interface TitleInterface {
  id: string;
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
  watchProviders: string[];
  seasons: Season[];
  numEpisodes: number;
}

export interface Season {
  seasonNumber: number;
  episodeCount: number;
}

export interface UserTitle {
  title: TitleInterface;
  currentSeason: Season;
  rating: number;
  episodesWatched: number;
  comment: string;
  dateAdded: Date;
  dateFinished: Date;
  isFinished: boolean;
  isStarted: boolean;
  isAdded: boolean;
}

export interface UserResponse {
  seenMovies: Array<UserTitle>;
}

interface MovieProps {
  st: UserTitle;
  clickTitle: (title: UserTitle) => void;
}

export const wrapToDefaultTitle = (title: TitleInterface): UserTitle => {
  return {
    title: title,
    currentSeason: { seasonNumber: 1, episodeCount: 1 },
    rating: 0,
    episodesWatched: 0,
    comment: "",
    dateAdded: new Date(),
    dateFinished: new Date(),
    isFinished: false,
    isAdded: false,
    isStarted: false,
  };
};

const Title: React.FC<MovieProps> = ({ st, clickTitle }: MovieProps) => {
  return (
    <Box w={"15em"}>
      <Image
        src={`${st.title.posterLink}`}
        alt={st.title.name}
        h={"20em"}
        w={"100%"}
        _hover={{
          cursor: "pointer",
        }}
        onClick={() => clickTitle(st)}
        borderRadius="5%"
      />
      <Flex justify="space-between" p={2} flexDir="column">
        <Flex justifyContent="space-between" flexDirection="row">
          <Heading as="h3" size="md">
            {st.title.name}
          </Heading>
          <Text paddingRight={5}>{st.title.year}</Text>
          <Text>{st.title.rating}</Text>
        </Flex>
        <Flex
          visibility={st.rating === 0 ? "hidden" : undefined}
          justifyContent="space-between"
          flexDirection="row"
        >
          <Text>Your rating: </Text>
          <Text fontWeight="bold" color="blue" fontSize="sm">
            {st.rating}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Title;
