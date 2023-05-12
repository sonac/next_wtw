import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";

import UserTitles from "../../src/components/user_titles";
import { UserTitle } from "../../src/components/title";
import Header from "../../src/sections/header";

//@ts-ignore
const moviesFetcher = () =>
  fetch(`/api/user-movies`, { credentials: "include" }).then((res) =>
    res.json()
  );

function UserMovies() {
  const [movies, setMovies] = useState<UserTitle[]>([]);
  const { data, error } = useSWR("seenMovies", moviesFetcher);
  const router = useRouter();

  useEffect(() => {
      if (error) {
        router.push("/")
      }
    [router]
  });

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
