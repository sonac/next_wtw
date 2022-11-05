import {
  SimpleGrid, GridItem, VStack, Image, useDisclosure, Menu, MenuButton,
  MenuList, MenuItem, Button
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useSWR from 'swr';
import { useState } from 'react';

import Title, {SeenTitle, TitleInterface} from '../../src/components/title';
import GamesSearch, { Game, UserGame } from '../../src/components/games_search'
import Header from '../../src/sections/header';
import TitleCard from '../../src/components/title_card';

//@ts-ignore
const gamesFetcher = () => fetch(`/api/user-games`, { credentials: 'include' }).then((res) => res.json())

export const gameToCardTitle = (game: UserGame): TitleInterface => {
  return {
    name: game.game.name,
    posterLink: game.game.poster_link,
    year: game.game.first_release_date,
    rating: 0,
    ratingCount: 0,
    isSynced: game.isSynced,
    description: game.game.summary
  }
}

const gameToSeenTitle = (game: UserGame): SeenTitle => {
  return {
    title: gameToCardTitle(game),
    rating: 0,
    comment: '',
    dateAdded: new Date(),
  }
}

function UserSeries() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: gameOpen, onOpen: onGamesOpen, onClose: onGameClose } = useDisclosure();
  const [clickedGame, setClickedGame] = useState<SeenTitle>();
  const [games, setGames] = useState<SeenTitle[]>([]);
  const [clickedRating, setClickedRating] = useState<number>(0);
  const [sortBy, setSorting] = useState<string>('title');
  const { data, error } = useSWR('seenGames', gamesFetcher)

  if (error) { return <div>failed to load</div> };
  if (data && games.length === 0) {
    setGames(data.map((g: UserGame) => gameToSeenTitle(g)))
  }

  const clickGame = (m: SeenTitle) => {
    setClickedGame(m);
    setClickedRating(m.rating)
    onGamesOpen();
  }

  const upsertGame = async (): Promise<void> => {
    if (clickedGame === null || clickedGame === undefined) {
      console.error("failed to upsert movie")
      return
    }
    clickedGame.rating = clickedRating
    const resp = await fetch(`/api/game`, {
      method: clickedGame.title.isSynced ? 'PUT' : 'POST',
      body: JSON.stringify(clickedGame),
      credentials: 'include'
    })
    if (resp.status === 200) {
      setGames([...games, clickedGame])
      onClose()
      setClickedGame(undefined)
      location.reload()
    } else {
      console.error(resp)
    }
  }

  let curGames = games;


  switch (sortBy) {
    case 'dateAdded':
      curGames = games.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      break;
    case 'rating':
      curGames = games.sort((a, b) => b.rating - a.rating)
      break;
    case 'title':
      curGames = games.sort((a, b) => a.title.name.localeCompare(b.title.name))
      break;
  }

  return (
    <VStack
      h={{ md: '100vh' }}
      w={{ md: '100%' }}
      p={0}
      m={0}
      align='left'
      spacing={8}>
      <Header />
      <div style={{ 'paddingLeft': 40 }}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Sort</MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSorting('dateAdded')}>Date Added</MenuItem>
            <MenuItem onClick={() => setSorting('rating')}>Rating</MenuItem>
            <MenuItem onClick={() => setSorting('title')}>Title</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <GamesSearch isOpen={isOpen} onClose={onClose} setClickedGame={setClickedGame} setClickedRating={setClickedRating}
        onGamesOpen={onGamesOpen} />
      {clickedGame !== undefined ? <TitleCard isOpen={isOpen} onClose={onGameClose} title={clickedGame.title}
        clickedRating={clickedRating} setClickedRating={setClickedRating} upsertTitle={upsertGame} /> : <></>}
      <SimpleGrid minChildWidth='240px' spacing={8} gridTemplateColumns={'repeat(auto-fill, minmax(240px, 1fr))'}>
        <GridItem key="plus">
          <Image
            src={"/plus_icon.png"}
            alt="plus"
            h="340px"
            w="240px"
            _hover={{
              cursor: "pointer"
            }}
            onClick={onOpen}
          />
        </GridItem>
        {curGames.map((g: SeenTitle) => (
          <GridItem key={g.title.name}>
            <Title st={(g)} clickTitle={clickGame} />
          </GridItem>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default UserSeries;
