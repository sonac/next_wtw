import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { UserTitle } from "../../src/components/title";
import UserTitles from "../../src/components/user_titles";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import Header from "../../src/sections/header";

//@ts-ignore
const gamesFetcher = () =>
  fetch(`/api/user-games`, { credentials: "include" }).then((res) =>
    res.json()
  );

function UserGames() {
  const [games, setGames] = useState<UserTitle[]>([]);
  const { data, error } = useSWR("seenGames", gamesFetcher);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push("/");
    }
    [router];
  });

  if (error) {
    return <div>Redirecting...</div>;
  }

  if (games !== data) {
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
          <Tab fontSize="2em">Plan to Play</Tab>
          <Tab fontSize="2em">In Progress</Tab>
          <Tab fontSize="2em">Finished</Tab>
          <Tab fontSize="2em">Infinite trash</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTitles titles={[]} endpoint="serie" isDiscovery={false} />
          </TabPanel>
          <TabPanel>
            <UserTitles
              titles={games ? games.filter((g) => !g.isFinished) : []}
              endpoint="game"
              isDiscovery={false}
            />
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
                    titles={games ? games.filter(
                      (g) =>
                        g.isFinished &&
                        new Date(g.dateFinished).getFullYear() === 2023
                    ) : []}
                    endpoint="game"
                    isDiscovery={false}
                  />
                </TabPanel>
                <TabPanel>
                  <UserTitles
                    titles={games ? games.filter(
                      (g) =>
                        g.isFinished &&
                        new Date(g.dateFinished).getFullYear() === 2022
                    ) : []}
                    endpoint="game"
                    isDiscovery={false}
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

export default UserGames;
