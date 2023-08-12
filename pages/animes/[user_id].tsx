import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import  { UserTitle } from "../../src/components/title";
import UserTitles from "../../src/components/user_titles";
import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import Header from "../../src/sections/header";

const animesFetcher = () => 
  fetch(`/api/user-animes`, { credentials: "include" }).then((res) => res.json());

const UserAnimes = () => {
  const [animes, setAnimes] = useState<UserTitle[]>([]);
  const {data, error} = useSWR("seenAnimes", animesFetcher);
  const router = useRouter();

  useEffect(() => {
      if (error) {
        router.push("/")
      }
    [router]
  });
    
  if (error) {
    return <div>Redirecting...</div>;
  }

  if (animes !== data) {
    setAnimes(data);
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
      <Tabs defaultIndex={1} variant="soft-rounded" colorScheme={"green"}>
        <TabList justifyContent={"space-evenly"}>
          <Tab fontSize="2em">Plan to Watch</Tab>
          <Tab fontSize="2em">In Progress</Tab>
          <Tab fontSize="2em">Finished</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTitles titles={[]} endpoint="anime"  isDiscovery={false}/>
          </TabPanel>
          <TabPanel>
            <UserTitles titles={animes ? animes.filter(a => !a.isFinished) : []} endpoint="anime"  isDiscovery={false}/>
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList justifyContent="space-evenly">
                <Tab fontSize="2em">2023</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UserTitles titles={animes ? animes.filter(a => a.isFinished && new Date(a.dateFinished).getFullYear() === 2023) : []} endpoint="anime"  isDiscovery={false}/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </VStack>
  )
} 

export default UserAnimes;