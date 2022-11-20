import {
  SimpleGrid,
  GridItem,
  VStack,
  Image,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import { useState } from "react";

import Title, { SeenTitle, TitleInterface, MediaType } from "../../src/components/title";
import GamesSearch, { Game, UserGame } from "../../src/components/games_search";
import Header from "../../src/sections/header";
import TitleCard from "../../src/components/title_card";
import UserTitles from "../../src/components/user_titles";

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
    <UserTitles titles={games} endpoint="game" />
  )
}

export default UserGames;
