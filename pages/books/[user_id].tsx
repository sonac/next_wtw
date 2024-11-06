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

const booksFetcher = () =>
  fetch(`/api/user-books`, { credentials: "include" }).then((res) =>
    res.json()
  );

const UserBooks = () => {
  const [books, setBooks] = useState<UserTitle[]>([]);
  const { data, error } = useSWR("seenBooks", booksFetcher);

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

  if (books !== data) {
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
            <UserTitles titles={[]} endpoint="book" isDiscovery={false} />
          </TabPanel>
          <TabPanel>
            <UserTitles
              titles={books ? books.filter((b) => !b.isFinished) : []}
              endpoint="book"
              isDiscovery={false}
            />
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList justifyContent="space-evenly">
                <Tab fontSize="2em">2024</Tab>
                <Tab fontSize="2em">2023</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UserTitles
                    titles={
                      books
                        ? books.filter(
                            (b) =>
                              b.isFinished &&
                              new Date(
                                b.dateFinished || "0000"
                              ).getFullYear() === 2024
                          )
                        : []
                    }
                    endpoint="book"
                    isDiscovery={false}
                  />
                </TabPanel>
                <TabPanel>
                  <UserTitles
                    titles={
                      books
                        ? books.filter(
                            (b) =>
                              b.isFinished &&
                              new Date(
                                b.dateFinished || "0000"
                              ).getFullYear() === 2023
                          )
                        : []
                    }
                    endpoint="book"
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
};

export default UserBooks;
