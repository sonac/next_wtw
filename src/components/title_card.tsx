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
import { Dispatch, SetStateAction, useState } from "react";
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
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

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
                {userTitle.title.name}
              </Heading>
              <Grid
                p={25}
                templateColumns="repeat(3, 1fr)"
                justifyContent="space-between"
                templateRows="repeat(2,1fr)"
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
              <Link
                fontSize="lg"
                color="white"
                href={`https://imdb.com/title/${userTitle.title.ids.imdb}`}
              >
                Imdb
              </Link>
              <Text fontSize="xl" color="white">
                {userTitle.title.description.length > 0
                  ? userTitle.title.description.substring(0, 100)
                  : "No description provided"}
              </Text>
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
              {userTitle.title.seasons && userTitle.title.seasons.length > 0 ? (
                <Flex flexDir="row" w="100%" mt="1vh">
                  <Text pt="0.5em" fontSize="xl" color="white">
                    Season:
                  </Text>
                  <Select
                    color="white"
                    defaultValue={userTitle.currentSeason.seasonNumber || 1}
                    ml="1em"
                    mr="1em"
                    onChange={(e) => setSeason(parseInt(e.target.value))}
                  >
                    {userTitle.title.seasons.map((s) => (
                      <option value={s.seasonNumber}>{s.seasonNumber}</option>
                    ))}
                  </Select>
                  <Text pt="0.5em" fontSize="xl" color="white">
                    Episode:
                  </Text>
                  <Select
                    color="white"
                    ml="1em"
                    mr="1em"
                    defaultValue={userTitle.currentSeason.episodeCount || 0}
                    onChange={(e) => setEpisode(parseInt(e.target.value))}
                  >
                    {Array.from(
                      Array(
                        userTitle.title.seasons[season - 1].episodeCount
                      ).keys()
                    ).map((e) => (
                      <option value={e}>{e + 1}</option>
                    ))}
                  </Select>
                </Flex>
              ) : (
                <></>
              )}
              <Flex
                flexDir="row"
                justifyContent="space-between"
                w="100%"
                mt="3vh"
              >
                <Button
                  onClick={refreshTitle}
                  colorScheme="teal"
                  variant="outline"
                  fontSize="14px"
                  w="35%"
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
                  <FormControl ml="1vw" display="flex" alignItems="center">
                    <FormLabel
                      htmlFor="is-finished"
                      mb="0"
                      fontSize="20px"
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
                    fontSize="20px"
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
                </FormControl>
              </Flex>
              <Flex
                flexDir="row"
                paddingTop={10}
                paddingBottom={10}
                justifyContent="space-between"
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
                  <Text align="center">1</Text>
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
                  <Text align="center">2</Text>
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
                  <Text align="center">3</Text>
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
                  <Text align="center">4</Text>
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
                  <Text align="center">5</Text>
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
                  <Text align="center">6</Text>
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
                  <Text align="center">7</Text>
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
                  <Text align="center">8</Text>
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
                  <Text align="center">9</Text>
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
                  <Text align="center">10</Text>
                </Box>
              </Flex>
              <Button
                onClick={() => {
                  userTitle.currentSeason = {
                    seasonNumber: season,
                    episodeCount: episode,
                  };
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
