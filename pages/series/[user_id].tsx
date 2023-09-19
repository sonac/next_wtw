import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { UserTitle } from "../../src/components/title";
import UserTitles from "../../src/components/user_titles";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  Flex,
} from "@chakra-ui/react";
import Header from "../../src/sections/header";

//@ts-ignore
const seriesFetcher = () =>
  fetch(`/api/user-series`, { credentials: "include" }).then((res) =>
    res.json()
  );

function UserSeries() {
  const [series, setSeries] = useState<UserTitle[]>([]);
  const { data, error } = useSWR("seenSeries", seriesFetcher);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push("/");
    }
    [router];
  });

  if (data !== series) {
    setSeries(data);
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
            <UserTitles
              titles={series ? series.filter((s) => !s.isStarted) : []}
              endpoint="serie"
              isDiscovery={false}
            />
          </TabPanel>
          <TabPanel>
            <UserTitles
              titles={
                series ? series.filter((s) => s.isStarted && !s.isFinished) : []
              }
              endpoint="serie"
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
                    titles={
                      series
                        ? series.filter(
                            (s) =>
                              s.isFinished &&
                              new Date(s.dateFinished).getFullYear() === 2023
                          )
                        : []
                    }
                    endpoint="serie"
                    isDiscovery={false}
                  />
                </TabPanel>
                <TabPanel>
                  <UserTitles
                    titles={
                      series
                        ? series.filter(
                            (s) =>
                              s.isFinished &&
                              new Date(s.dateFinished).getFullYear() === 2022
                          )
                        : []
                    }
                    endpoint="serie"
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

export default UserSeries;
