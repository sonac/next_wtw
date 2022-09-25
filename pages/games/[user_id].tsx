
import { useRouter } from 'next/router';
import { SimpleGrid, GridItem, VStack, Image, useDisclosure, Menu, MenuButton, 
  MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useSWR from 'swr';
import { useState } from 'react';

import Title, { SeenTitle, TitleInterface } from '../../src/components/title';
import GamesSearch, { UserGame } from '../../src/components/games_search'
import Header from '../../src/sections/header';
import TitleCard, { CardTitle } from '../../src/components/title_card';

//@ts-ignore
const gamesFetcher = () => fetch(`/api/user-games`, {credentials: 'include'}).then((res) => res.json())

const gameToCardTitle = (game: UserGame): CardTitle => {
  return {
    posterLink: game.game.poster_link,
    name: game.game.name,
    year: game.game.first_release_date,
    rating: 0,
    ratingCount: 0,
    description: game.game.summary,
    isSynced: game.isSynced
  }
}

function UserSeries() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: seriesOpen, onOpen: onGamesOpen, onClose: onGameClose } = useDisclosure();
  const [clickedGame, setClickedGame] = useState<UserGame>();
  const [games, setGames] = useState<UserGame[]>([]);
  const [clickedRating, setClickedRating] = useState<number>(0);
  const [sortBy, setSorting] = useState<string>('title');
  const { data, error } = useSWR('seenGames', gamesFetcher)

  if (error) { return <div>failed to load</div> };
  if (data && games.length === 0) {
    setGames(data)
  }

  const clickGame = (m: UserGame) => {
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
          method: clickedGame.isSynced ? 'PUT' : 'POST',
          body: JSON.stringify(clickedGame),
          credentials: 'include'
      })
      if (resp.status === 200) {
          setGames([...games, clickedGame])
          onClose()
          location.reload()
      } else {
          console.error(resp)
      }
    }

  let curGames = games;


  switch(sortBy) {
    case 'dateAdded':
      curGames = games.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      break;
    case 'rating':
      curGames = games.sort((a, b) => b.rating - a.rating)
      break;
    case 'title':
      curGames = games.sort((a, b) => a.game.name.localeCompare(b.game.name))
      break;
  }

  console.log(clickedGame)

  return (
      <VStack 
        h={{ md: '100vh' }} 
        w={{ md: '100%' }}
        p={0}
        m={0}
        align='left'
        spacing={8}>
        <Header />
      <div style={{'paddingLeft': 40}}>
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
      {clickedGame !== undefined ? <TitleCard isOpen={isOpen} onClose={onGameClose} title={gameToCardTitle(clickedGame)} 
        clickedRating={clickedRating} setClickedRating={setClickedRating} upsertTitle={upsertGame} /> : <></>}
      <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={8}>
        <GridItem key="plus">
          <Image           
            src={"/plus_icon.png"}
            alt="plus"
            size="100%"
            boxSize="100%"
            _hover={{
              cursor: "pointer"
            }}
            onClick={onOpen}
          />
        </GridItem>
        {curGames.map((sm: any) => (
          <GridItem key={sm.title.imdbId} onClick={() => clickGame(sm)}>
            <Title movie={sm.title} rating={sm.rating} />
          </GridItem>
        ))}
      </SimpleGrid>
      </VStack>
  );
}

export default UserSeries;
