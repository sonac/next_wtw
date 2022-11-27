import useSWR from "swr";
import { useState } from "react";

import  { SeenTitle } from "../../src/components/title";
import UserTitles from "../../src/components/user_titles";
import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import Header from "../../src/sections/header";

//@ts-ignore
const gamesFetcher = () =>
  fetch(`/api/user-games`, { credentials: "include" }).then((res) =>
    res.json()
  );

function UserGames() {
  const [games, setGames] = useState<SeenTitle[]>([]);
  const { data, error } = useSWR("seenGames", gamesFetcher);

  if (error) {
    return <div>failed to load</div>;
  }

  if (data && games.length === 0) {
    setGames(data);
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
            <Tab fontSize="2em">In Progress</Tab>
            <Tab fontSize="2em">Finished</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTitles titles={[]} endpoint="serie" />
          </TabPanel>
          <TabPanel>
            <UserTitles titles={games.filter(g => !g.isFinished)} endpoint="game" />
          </TabPanel>
          <TabPanel>
            <UserTitles titles={games.filter(g => g.isFinished)} endpoint="game" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default UserGames;
