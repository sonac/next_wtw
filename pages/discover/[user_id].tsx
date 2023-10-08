import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  TitleInterface,
  UserTitle,
  wrapToDefaultTitle,
} from "../../src/components/title";
import UserTitles from "../../src/components/user_titles";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import Header from "../../src/sections/header";

const discoveryFetcher = () =>
  fetch(`/api/discover`, { credentials: "include" }).then((res) => res.json());

const clickRefreshPopular = async () => {
  await fetch("/api/refresh-popular", { method: "POST" });
  window.location.reload();
};

const Discover = () => {
  const [titles, setTitles] = useState<TitleInterface[]>([]);
  const { data, error } = useSWR("discover", discoveryFetcher);

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

  if (titles != data) {
    setTitles(data);
  }

  const sortedTitles = titles
    ? titles.sort((t1, t2) => t2.rating - t1.rating)
    : [];

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
      <Button w="10vw" onClick={clickRefreshPopular}>
        Refresh popular titles
      </Button>
      <UserTitles
        titles={sortedTitles.map((t) => wrapToDefaultTitle(t))}
        endpoint="movie"
        isDiscovery={true}
      />
    </VStack>
  );
};

export default Discover;
