import useSWR from "swr";
import { useState } from "react";

import  { SeenTitle } from "../../src/components/title";
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
