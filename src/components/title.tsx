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

export interface Person {
  character: string;
  gender: number;
  knownForDepartment: string;
  name: string;
  profilePath: string;
  job: string;
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
  people: Person[];
}

export interface Season {
  seasonNumber: number;
  episodeCount: number;
  name: string;
  voteAverage: number;
  posterLink: string;
}

export interface UserTitle {
  title: TitleInterface;
  rating?: number;
  episodesWatched?: number;
  comment?: string;
  dateAdded?: Date;
  dateFinished?: Date;
  isFinished?: boolean;
  isStarted?: boolean;
  isAdded?: boolean;
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
    <Box w={"15em"} className="title-image">
      <Image
        src={`${st.title.posterLink}`}
        alt={st.title.name}
        h={{ sm: "10em", lg: "270px", "2xl": "320px" }}
        w={{ sm: "150px", lg: "200px", "2xl": "240px" }}
        _hover={{
          cursor: "pointer",
          transform: "scale(1.1)",
          boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.7)",
          border: "5px solid white",
        }}
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        borderRadius="5%"
        fontFamily={"Roboto"}
        onClick={() => clickTitle(st)}
      />
      <Flex
        justify="space-between"
        p={2}
        flexDir="column"
        maxW={{ lg: "200px", "2xl": "240px" }}
      >
        <Flex justifyContent="space-between" flexDirection="row">
          {/* @ts-ignore */}
          <Heading as="h3" size={{ lg: "sm", "2xl": "md" }}>
            {st.title.name}
          </Heading>
          {/* @ts-ignore */}
          <Text paddingRight={5} pl={1} size={{ lg: "sm", "2xl": "md" }}>
            {st.title.year}
          </Text>
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
