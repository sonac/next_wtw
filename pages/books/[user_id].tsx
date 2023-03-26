import useSWR from "swr";
import { useState } from "react";

import  { SeenTitle } from "../../src/components/title";
import UserTitles from "../../src/components/user_titles";
import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import Header from "../../src/sections/header";

const booksFetcher = () => 
  fetch(`/api/user-books`, { credentials: "include" }).then((res) => res.json());

const UserBooks = () => {
  const [books, setBooks] = useState<SeenTitle[]>([]);
  const {data, error} = useSWR("seenBooks", booksFetcher);

  if (error) {
    return <div>failed to load</div>
  }

  if (data && data.length !== 0 && books.length === 0) {
    setBooks(data);
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
          <Tab fontSize="2em">Plan to Read</Tab>
          <Tab fontSize="2em">In Progress</Tab>
          <Tab fontSize="2em">Finished</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTitles titles={[]} endpoint="book" />
          </TabPanel>
          <TabPanel>
            <UserTitles titles={books.filter(b => !b.isFinished)} endpoint="book" />
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList justifyContent="space-evenly">
                <Tab fontSize="2em">2023</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UserTitles titles={books.filter(b => b.isFinished && new Date(b.dateFinished).getFullYear() === 2023)} endpoint="book" />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </VStack>
  )
} 

export default UserBooks;