import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Image,
  Text,
  Grid,
  Heading,
  GridItem,
  Box,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Link,
  Select,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MediaType, UserTitle } from "./title";

interface CardProps {
  isOpen: boolean;
  onClose: any;
  userTitle: UserTitle;
  setClickedTitle: Dispatch<SetStateAction<UserTitle | undefined>>;
  upsertTitle: (t: UserTitle, m: string) => Promise<void>;
  refreshTitle: () => Promise<void>;
}

const logoForWP = (wpName: string): string => {
  switch (wpName) {
    case "Disney Plus":
      return "/disney_logo.png";
    case "Netflix":
      return "/netflix_logo.png";
    case "Amazon Prime Video":
      return "/amazon_logo.png";
  }
  return "";
};

const isAllowedProvider = (wpName: string): boolean => {
  const allowedProviders = [
    "Netflix",
    "Disney Plus",
    "Amazon Prime Video",
    "Apple TV",
  ];
  return allowedProviders.includes(wpName);
};

const TitleCard: React.FC<CardProps> = ({
  isOpen,
  onClose,
  userTitle,
  setClickedTitle,
  upsertTitle,
  refreshTitle,
}: CardProps) => {
  const getBg = (rtng: number): string => {
    if (rtng == userTitle.rating) {
      return "rgba(120, 116, 171, 0.52)";
    }
    return "transparent";
  };
  const [episode, setEpisode] = useState(userTitle.episodesWatched || 0);

  console.log(userTitle);

  useEffect(() => {
    setEpisode(userTitle.episodesWatched || 0);
  }, [userTitle.episodesWatched]);

  const updateEpisode = (v: string) => {
    const n = Number.parseInt(v);
    if (isNaN(n) || n === undefined) {
      setEpisode(episode);
      return;
    }
    setEpisode(n);
  };

  return (
    <Modal
      variant={"movie"}
      isOpen={isOpen}
      size={"xl"}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody bg="rgba(34, 34, 34, 0.7)">
          <Flex flexDirection="row">
            {userTitle.title.posterLink ? (
              <Image
                src={`${userTitle.title.posterLink}`}
                alt={userTitle.title.name}
                maxW="40%"
                minW="40%"
              />
            ) : (
              <div style={{ margin: "auto" }}>
                <Text color="white">
                  Seems that poster is missing, you can provide link to it
                  manually
                </Text>
                <Input
                  color="white"
                  onChange={(e) => {
                    userTitle.title.posterLink = e.target.value;
                  }}
                ></Input>
                <Button
                  minW="30%"
                  marginLeft="5%"
                  marginRight="5%"
                  onClick={() => upsertTitle(userTitle, "PUT")}
                >
                  Set poster
                </Button>
              </div>
            )}
            <Flex flexDir="column" p="10px" justifyContent="space-between">
              <Heading
                paddingTop="10px"
                paddingLeft={25}
                size="2xl"
                color="white"
              >
                <Link
                  href={`/title/${userTitle.title.id}?type=movie`}
                  className="title-main"
                  fontStyle={"normal"}
                  fontWeight={"normal"}
                >
                  {userTitle.title.name}
                </Link>
              </Heading>
              <Grid
                p={25}
                templateColumns="repeat(3, 1fr)"
                justifyContent="space-between"
                templateRows="repeat(2,1fr)"
                className="title-main"
              >
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    Year
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    Rating
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    Rating Count
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    {userTitle.title.year}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    {userTitle.title.rating}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    {userTitle.title.ratingCount}
                  </Text>
                </GridItem>
              </Grid>
              <Text fontSize="xl" color="white" className="title-description">
                {userTitle.title.description.length > 0
                  ? userTitle.title.description.substring(0, 100)
                  : "No description provided"}
              </Text>
              {userTitle.title.type === MediaType.Movie ? (
                <div>
                  <Flex flexDir="row" justifyContent="" w="100%" mt="3vh">
                    <Text fontSize="sm" color="white" pr={5}>
                      Available on:{" "}
                    </Text>
                    {userTitle.title.watchProviders === null ? (
                      <div />
                    ) : (
                      userTitle.title.watchProviders
                        .filter((wp) => isAllowedProvider(wp))
                        .map((wp) => (
                          <Image
                            key={wp}
                            src={logoForWP(wp)}
                            alt="provider_logo"
                            h="30px"
                            w="70px"
                            pb={2}
                            mr={4}
                          />
                        ))
                    )}
                  </Flex>
                  <Text fontSize="sm" color="white" pt={5}>
                    Powered by JustWatch
                  </Text>
                </div>
              ) : (
                <></>
              )}
              {userTitle.title.type === MediaType.Anime ? (
                <Flex pt={10} flexDir="row">
                  <Text fontSize="md" color="white">
                    Watched
                  </Text>
                  <Text
                    ml={5}
                    mr={3}
                    fontSize="2xl"
                    color="white"
                    onClick={() => setEpisode(episode - 1)}
                    _hover={{
                      cursor: "pointer", // Changes the cursor to a pointer
                      color: "gray.300", // Change the color on hover (example)
                      textDecoration: "underline", // Example of another style change on hover
                    }}
                  >
                    -
                  </Text>
                  <Input
                    size="sm"
                    w="10%"
                    color="white"
                    value={episode}
                    onChange={(e) => updateEpisode(e.target.value)}
                  ></Input>
                  <Text
                    ml={5}
                    mr={3}
                    fontSize="2xl"
                    color="white"
                    onClick={() => setEpisode(episode + 1)}
                    _hover={{
                      cursor: "pointer", // Changes the cursor to a pointer
                      color: "gray.300", // Change the color on hover (example)
                      textDecoration: "underline", // Example of another style change on hover
                    }}
                  >
                    +
                  </Text>
                  <Text fontSize="md" color="white">
                    episode from {userTitle.title.numEpisodes}
                  </Text>
                </Flex>
              ) : (
                <></>
              )}
              <Flex
                flexDir="row"
                justifyContent="space-around"
                w="100%"
                mt="3vh"
              >
                <Button
                  onClick={refreshTitle}
                  colorScheme="teal"
                  variant="outline"
                  fontSize="14px"
                  w="20%"
                >
                  Refresh info
                </Button>
                <Button
                  onClick={() => upsertTitle(userTitle, "DELETE")}
                  ml="1vw"
                  colorScheme="red"
                  variant="outline"
                  w="20%"
                >
                  Delete
                </Button>
                {userTitle.title.type !== MediaType.Movie ? (
                  <FormControl
                    w="25%"
                    ml="1vw"
                    display="flex"
                    alignItems="center"
                  >
                    <FormLabel
                      htmlFor="is-finished"
                      mb="0"
                      fontSize="1rem"
                      color="gray"
                    >
                      <b>Is finished?</b>
                    </FormLabel>
                    <Switch
                      id="is-finished"
                      defaultChecked={userTitle.isFinished}
                      onChange={() =>
                        (userTitle.isFinished = !userTitle.isFinished)
                      }
                    />
                  </FormControl>
                ) : (
                  <div></div>
                )}
                <FormControl ml="1vw" display="flex" alignItems="center">
                  <FormLabel
                    htmlFor="is-finished"
                    mb="0"
                    fontSize="1rem"
                    color="gray"
                  >
                    <b>Is started?</b>
                  </FormLabel>
                  <Switch
                    id="is-finished"
                    defaultChecked={userTitle.isStarted}
                    onChange={() =>
                      (userTitle.isStarted = !userTitle.isStarted)
                    }
                  />
                  {userTitle.title.type === MediaType.Game ? (
                    <FormControl ml="1vw" display="flex" alignItems="center">
                      <FormLabel
                        htmlFor="is-finished"
                        mb="0"
                        fontSize="1rem"
                        color="gray"
                      >
                        <b>Is dropped?</b>
                      </FormLabel>
                      <Switch
                        id="is-finished"
                        defaultChecked={userTitle.isFinished}
                        onChange={() =>
                          (userTitle.isFinished = !userTitle.isFinished)
                        }
                      />
                    </FormControl>
                  ) : (
                    <div></div>
                  )}
                </FormControl>
              </Flex>
              <Flex
                flexDir="row"
                paddingTop={10}
                paddingBottom={10}
                justifyContent="space-around"
              >
                <Box
                  bg={getBg(1)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedTitle({ ...userTitle, rating: 1 })}
                >
                  <Text align="center" className="score">
                    1
                  </Text>
                </Box>
                <Box
                  bg={getBg(2)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedTitle({ ...userTitle, rating: 2 })}
                >
                  <Text align="center" className="score">
                    2
                  </Text>
                </Box>
                <Box
                  bg={getBg(3)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedTitle({ ...userTitle, rating: 3 })}
                >
                  <Text align="center" className="score">
                    3
                  </Text>
                </Box>
                <Box
                  bg={getBg(4)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedTitle({ ...userTitle, rating: 4 })}
                >
                  <Text align="center" className="score">
                    4
                  </Text>
                </Box>
                <Box
                  bg={getBg(5)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedTitle({ ...userTitle, rating: 5 })}
                >
                  <Text align="center" className="score">
                    5
                  </Text>
                </Box>
                <Box
                  bg={getBg(6)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedTitle({ ...userTitle, rating: 6 })}
                >
                  <Text align="center" className="score">
                    6
                  </Text>
                </Box>
                <Box
                  bg={getBg(7)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedTitle({ ...userTitle, rating: 7 })}
                >
                  <Text align="center" className="score">
                    7
                  </Text>
                </Box>
                <Box
                  bg={getBg(8)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedTitle({ ...userTitle, rating: 8 })}
                >
                  <Text align="center" className="score">
                    8
                  </Text>
                </Box>
                <Box
                  bg={getBg(9)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedTitle({ ...userTitle, rating: 9 })}
                >
                  <Text align="center" className="score">
                    9
                  </Text>
                </Box>
                <Box
                  bg={getBg(10)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedTitle({ ...userTitle, rating: 10 })}
                >
                  <Text align="center" className="score">
                    10
                  </Text>
                </Box>
              </Flex>
              <Button
                onClick={() => {
                  if (userTitle.title.type === MediaType.Anime) {
                    userTitle.episodesWatched = episode;
                  }
                  return upsertTitle(
                    userTitle,
                    userTitle.isAdded ? "PUT" : "POST"
                  );
                }}
              >
                {userTitle.isAdded ? "Update" : "Add"}
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TitleCard;
