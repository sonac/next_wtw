import useSWR from "swr";
import { useState } from "react";

import { SeenTitle } from "../../src/components/title";
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
  const [series, setSeries] = useState<SeenTitle[]>([]);
  const { data, error } = useSWR("seenSeries", seriesFetcher);

  if (error) {
    return <div>failed to load</div>;
  }

  if (data && series.length === 0) {
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
            <UserTitles titles={[]} endpoint="serie" />
          </TabPanel>
          <TabPanel>
            <UserTitles titles={series.filter(s => !s.isFinished)} endpoint="serie" />
          </TabPanel>
          <TabPanel>
            <UserTitles titles={series.filter(s => s.isFinished)} endpoint="serie" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export default UserSeries;
