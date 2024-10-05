import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { TitleInterface, wrapToDefaultTitle } from "../../src/components/title";
import UserTitles from "../../src/components/user_titles";
import { Button, VStack } from "@chakra-ui/react";
import Header from "../../src/sections/header";

const gamesFetcher = () =>
  fetch(`/api/games`, { credentials: "include" }).then((res) => res.json());

const Games = () => {
  const [titles, setTitles] = useState<TitleInterface[]>([]);
  const { data, error } = useSWR("games", gamesFetcher);

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
      <UserTitles
        titles={sortedTitles.map((t) => wrapToDefaultTitle(t))}
        endpoint="game"
        isDiscovery={true}
      />
    </VStack>
  );
};

export default Games;
