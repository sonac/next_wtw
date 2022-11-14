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

import Title, { SeenTitle, TitleInterface } from "../../src/components/title";
import GamesSearch, { Game, UserGame } from "../../src/components/games_search";
import Header from "../../src/sections/header";
import TitleCard from "../../src/components/title_card";

//@ts-ignore
const gamesFetcher = () =>
  fetch(`/api/user-games`, { credentials: "include" }).then((res) =>
    res.json()
  );

export const gameToCardTitle = (
  game: Game,
  isSynced: boolean
): TitleInterface => {
  return {
    name: game.name,
    posterLink: game.posterLink,
    year: game.year,
    rating: game.rating,
    ratingCount: 0,
    isSynced: isSynced,
    description: game.summary,
    id: game.id.toString(),
  };
};

const gameToSeenTitle = (game: UserGame): SeenTitle => {
  return {
    title: gameToCardTitle(game.game, true),
    rating: game.rating,
    comment: "",
    dateAdded: game.dateAdded,
  };
};

const titleToUserGame = (title: TitleInterface): UserGame => {
  return {
    rating: 0,
    dateAdded: new Date(),
    game: {
      name: title.name,
      id: parseInt(title.id),
      posterLink: title.posterLink,
      summary: title.description,
      year: title.year,
      rating: title.rating,
      ratingCount: title.ratingCount,
    },
  };
};

function UserSeries() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: gameOpen,
    onOpen: onGamesOpen,
    onClose: onGameClose,
  } = useDisclosure();
  const [clickedGame, setClickedGame] = useState<SeenTitle>();
  const [games, setGames] = useState<SeenTitle[]>([]);
  const [clickedRating, setClickedRating] = useState<number>(0);
  const [sortBy, setSorting] = useState<string>("title");
  const { data, error } = useSWR("seenGames", gamesFetcher);

  if (error) {
    return <div>failed to load</div>;
  }
  if (data && games.length === 0) {
    setGames(data.map((g: UserGame) => gameToSeenTitle(g)));
  }

  const clickGame = (m: SeenTitle) => {
    setClickedGame(m);
    setClickedRating(m.rating);
    onGamesOpen();
  };

  const upsertGame = async (): Promise<void> => {
    if (clickedGame === null || clickedGame === undefined) {
      console.error("failed to upsert game");
      return;
    }
    const game = titleToUserGame(clickedGame.title);
    game.rating = clickedRating;
    const resp = await fetch(`/api/game`, {
      method: clickedGame.title.isSynced ? "PUT" : "POST",
      body: JSON.stringify(game),
      credentials: "include",
    });
    if (resp.status === 200) {
      setGames([...games, clickedGame]);
      onClose();
      setClickedGame(undefined);
      location.reload();
    } else {
      console.error(resp);
    }
  };

  const removeGame = async (): Promise<void> => {
    alert('Not implemented yet!')
  }

  const refreshGame = async (): Promise<void> => {
    const game: Game = {
      name: clickedGame?.title.name || '',
      id: parseInt(clickedGame?.title.id || '0'),
      posterLink: clickedGame?.title.posterLink || '',
      summary: clickedGame?.title.description || '',
      year: clickedGame?.title.year || 0,
      rating: clickedGame?.title.rating || 0,
      ratingCount: clickedGame?.title.ratingCount || 0,
    }
    const uGame: UserGame = {
      rating: clickedGame?.rating || 0,
      dateAdded: clickedGame?.dateAdded || new Date,
      game: game
    }
    const resp = await fetch(`/api/refresh-game`, {
      method: 'PUT',
      body: JSON.stringify(uGame),
      credentials: 'include',
    });
    if (resp.status === 200) {
      setClickedGame(undefined);
      location.reload();
    } else {
      console.error(resp);
    }
  };

  let curGames = games;

  switch (sortBy) {
    case "dateAdded":
      curGames = games.sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
      break;
    case "rating":
      curGames = games.sort((a, b) => b.rating - a.rating);
      break;
    case "title":
      curGames = games.sort((a, b) => a.title.name.localeCompare(b.title.name));
      break;
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
      <div style={{ paddingLeft: 40 }}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Sort
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSorting("dateAdded")}>
              Date Added
            </MenuItem>
            <MenuItem onClick={() => setSorting("rating")}>Rating</MenuItem>
            <MenuItem onClick={() => setSorting("title")}>Title</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <GamesSearch
        isOpen={isOpen}
        onClose={onClose}
        setClickedGame={setClickedGame}
        setClickedRating={setClickedRating}
        onGamesOpen={onGamesOpen}
      />
      {clickedGame !== undefined ? (
        <TitleCard
          isOpen={gameOpen}
          onClose={onGameClose}
          title={clickedGame.title}
          clickedRating={clickedRating}
          setClickedRating={setClickedRating}
          upsertTitle={upsertGame}
          refreshTitle={refreshGame}
          removeTitle={removeGame}
        />
      ) : (
        <></>
      )}
      <SimpleGrid
        paddingLeft="40px"
        paddingRight="40px"
        minChildWidth="240px"
        spacing='3vw'
        gridTemplateColumns={"repeat(auto-fill, minmax(240px, 1fr))"}
      >
        <GridItem key="plus">
          <Image
            src={"/plus_icon.png"}
            alt="plus"
            h="340px"
            w="240px"
            _hover={{
              cursor: "pointer",
            }}
            onClick={onOpen}
          />
        </GridItem>
        {curGames.map((g: SeenTitle) => (
          <GridItem key={g.title.name}>
            <Title st={g} clickTitle={clickGame} />
          </GridItem>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default UserSeries;
