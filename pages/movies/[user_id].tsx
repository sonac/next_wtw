import {
  SimpleGrid, GridItem, VStack, Image, useDisclosure, Menu, MenuButton,
  MenuList, MenuItem, Button
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useSWR from 'swr';
import { useState } from 'react';

import Title, { SeenTitle } from '../../src/components/title';
import MovieSearch from '../../src/components/movie_search'
import Header from '../../src/sections/header';
import MovieCard from '../../src/components/title_card';

//@ts-ignore
const moviesFetcher = () => fetch(`/api/seen-movies`, { credentials: 'include' }).then((res) => res.json())

function UserMovies() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: movieOpen, onOpen: onMovieOpen, onClose: onMovieClose } = useDisclosure();
  const [clickedMovie, setClickedMovie] = useState<SeenTitle>();
  const [movies, setMovies] = useState<SeenTitle[]>([]);
  const [clickedRating, setClickedRating] = useState<number>(0);
  const [sortBy, setSorting] = useState<string>('title');
  const { data, error } = useSWR('seenList', moviesFetcher)

  if (error) { return <div>failed to load</div> };
  if (!data) { return <div>loading...</div> };

  if (data.seenMovies && movies.length === 0) {
    setMovies(data.seenMovies)
  }

  const clickMovie = (m: SeenTitle): void => {
    setClickedMovie(m);
    setClickedRating(m.rating)
    onMovieOpen();
  }

  const upsertMovie = async (): Promise<void> => {
    if (clickedMovie === null || clickedMovie === undefined) {
      console.error("failed to upsert movie")
      return
    }
    const newMovie: SeenTitle = {
      title: clickedMovie?.title,
      rating: clickedRating,
      comment: ''
    }
    const resp = await fetch(`/api/movie`, {
      method: clickedMovie.title.isSynced ? 'PUT' : 'POST',
      body: JSON.stringify(newMovie),
      credentials: 'include'
    })
    if (resp.status === 200) {
      setMovies([...movies, newMovie])
      onClose()
      location.reload()
    } else {
      console.error(resp)
    }
  }

  let curMovies = movies;

  switch (sortBy) {
    case 'dateAdded':
      curMovies = movies.sort((a, b) => new Date(b.title.dateAdded).getTime() - new Date(a.title.dateAdded).getTime())
      break;
    case 'rating':
      curMovies = movies.sort((a, b) => b.rating - a.rating)
      break;
    case 'title':
      curMovies = movies.sort((a, b) => a.title.name.localeCompare(b.title.name))
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
      <MovieSearch isOpen={isOpen} onClose={onClose} setClickedMovie={setClickedMovie} setClickedRating={setClickedRating} onMovieOpen={onMovieOpen} />
      {clickedMovie !== undefined ? <MovieCard isOpen={movieOpen} onClose={onMovieClose} title={clickedMovie.title}
        clickedRating={clickedRating} setClickedRating={setClickedRating} upsertTitle={upsertMovie} /> : <></>}
      <SimpleGrid minChildWidth='240px' spacing={'3vw'} gridTemplateColumns={'repeat(auto-fill, minmax(240px, 1fr))'}>
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
        {curMovies.map((sm: any) => (
          <GridItem key={sm.title.imdbId}>
            <Title st={sm} clickTitle={clickMovie}/>
          </GridItem>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default UserMovies;
