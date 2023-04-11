import useSWR from "swr";
import { useState } from "react";
import UserTitles from "../../src/components/user_titles";
import { SeenTitle } from "../../src/components/title";
import Header from "../../src/sections/header";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";

//@ts-ignore
const moviesFetcher = () =>
  fetch(`/api/user-movies`, { credentials: "include" }).then((res) =>
    res.json()
  );

function UserMovies() {
  const [movies, setMovies] = useState<SeenTitle[]>([]);
  const { data, error } = useSWR("seenMovies", moviesFetcher);

  if (error) {
    return <div>failed to load</div>;
  }

  if (data && movies.length === 0) {
    setMovies(data);
  }

  return (
    <VStack
      h={{ md: "100vh" }}
      w={{ md: "100%" }}
      p={0}
      m={0}
      align="left"
      spacing={8}
    >
      <Header />
      <Tabs defaultIndex={1} variant="soft-rounded" colorScheme="green">
        <TabList justifyContent={"space-evenly"}>
            <Tab fontSize="2em">Plan to Watch</Tab>
            <Tab fontSize="2em">Finished</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTitles titles={movies.filter(m => !m.isStarted)} endpoint="movie" />
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList justifyContent="space-evenly">
                <Tab fontSize="2em">2023</Tab>
                <Tab fontSize="2em">2022</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UserTitles
                    titles={movies.filter(
                      (m) =>
                        m.isFinished &&
                        new Date(m.dateFinished).getFullYear() === 2023
                    )}
                    endpoint="movie"
                  />
                </TabPanel>
                <TabPanel>
                  <UserTitles
                    titles={movies.filter(
                      (m) =>
                        m.isFinished &&
                        new Date(m.dateFinished).getFullYear() === 2022
                    )}
                    endpoint="movie"
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export default UserMovies;
