import { useRouter } from 'next/router';
import { SimpleGrid, GridItem, VStack, Image, useDisclosure, Menu, MenuButton, 
  MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useSWR from 'swr';
import { useState } from 'react';

import Movie, { MovieInterface, SeenMovie } from '../../src/components/movie';
import MovieSearch from '../../src/components/movie_search'
import Header from '../../src/sections/header';
import MovieCard from '../../src/components/movie_card';

//@ts-ignore
const moviesFetcher = () => fetch(`/api/seen-movies`, {credentials: 'include'}).then((res) => res.json())

function UserMovies() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: movieOpen, onOpen: onMovieOpen, onClose: onMovieClose } = useDisclosure();
  const [clickedMovie, setClickedMovie] = useState<SeenMovie>();
  const [movies, setMovies] = useState<SeenMovie[]>([]);
  const [clickedRating, setClickedRating] = useState<number>(0);
  const [sortBy, setSorting] = useState<string>('title');
  const router = useRouter();
  const { data, error } = useSWR('seenList', moviesFetcher)

  if (error) { return <div>failed to load</div> };
  if (!data) { return <div>loading...</div> };

  if (data.seenMovies && movies.length === 0) {
    setMovies(data.seenMovies)
  }

  const clickMovie = (m: SeenMovie) => {
    setClickedMovie(m);
    setClickedRating(m.rating)
    onMovieOpen();
  }

  let curMovies = movies;

  switch(sortBy) {
    case 'dateAdded':
      curMovies = movies.sort((a, b) => Date.parse(b.movie.dateAdded) - Date.parse(a.movie.dateAdded)).reverse()
      break;
    case 'rating':
      curMovies = movies.sort((a, b) => b.rating - a.rating).reverse()
      break;
    case 'title':
      curMovies = movies.sort((a, b) => a.movie.title.localeCompare(b.movie.title))
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
      <MovieSearch isOpen={isOpen} onClose={onClose} setClickedMovie={setClickedMovie} setClickedRating={setClickedRating} onMovieOpen={onMovieOpen} />
      {clickedMovie !== undefined ? <MovieCard isOpen={movieOpen} onClose={onMovieClose} movie={clickedMovie.movie} 
        clickedRating={clickedRating} setClickedRating={setClickedRating} setMovies={setMovies} movies={movies} /> : <></>}
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
        {curMovies.map((sm: any) => (
          <GridItem key={sm.movie.imdbId} onClick={() => clickMovie(sm)}>
            <Movie movie={sm.movie} rating={sm.rating} />
          </GridItem>
        ))}
      </SimpleGrid>
      </VStack>
  );
}

export default UserMovies;
