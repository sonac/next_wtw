import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import  { TitleInterface, UserTitle, wrapToDefaultTitle } from "../../src/components/title";
import UserTitles from "../../src/components/user_titles";
import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import Header from "../../src/sections/header";

const discoveryFetcher = () => 
  fetch(`/api/discover`, { credentials: "include" }).then((res) => res.json());

const Discover = () => {
  const [titles, setTitles] = useState<TitleInterface[]>([]);
  const {data, error} = useSWR("discover", discoveryFetcher);

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

  if (data && data.length !== 0 && titles.length === 0) {
    setTitles(data);
  }

  const sortedTitles = titles.sort ((t1, t2) => t2.rating - t1.rating)

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
      <UserTitles titles={sortedTitles.map(t => wrapToDefaultTitle(t))} endpoint="" isDiscovery={true}/>

    </VStack>
  )
} 

export default Discover;