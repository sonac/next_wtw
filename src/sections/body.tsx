import { VStack, Heading, Text, Box, SimpleGrid, Flex } from "@chakra-ui/react";
import SectionCard from "../components/section_card";

interface Section {
  name: string;
  imageUrl: string;
  link: string;
}

const sections: Section[] = [
  {
    name: "Movies",
    imageUrl: "/movies.webp",
    link: "/movies",
  },
  {
    name: "Series",
    imageUrl: "/series.webp",
    link: "/series",
  },
  {
    name: "Games",
    imageUrl: "/games.webp",
    link: "/games",
  },
  {
    name: "Books",
    imageUrl: "/books.webp",
    link: "/books",
  },
  {
    name: "Animes",
    imageUrl: "/animes.webp",
    link: "/animes",
  },
];

const body = () => {
  console.log(sections);
  return (
    <Box p={8} mt="70px">
      <Heading mb={8} textAlign="center" fontSize="4xl">
        Welcome to My List (the best one)
      </Heading>
      <Flex
        flexWrap="wrap"
        justify="space-around"
        align="center"
        gap={8}
        w="75vw"
        mx="auto"
      >
        {sections.map((section) => {
          return (
            <SectionCard
              key={section.name}
              name={section.name}
              imageUrl={section.imageUrl}
              link={section.link}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default body;
