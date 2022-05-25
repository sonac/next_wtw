import { useRouter } from 'next/router';
import { SimpleGrid, GridItem, VStack, Image, useDisclosure } from '@chakra-ui/react';
import useSWR from 'swr';

import Movie, { MovieInterface, SeenMovie } from '../../src/components/movie';
import MovieSearch from '../../src/components/movie_search'
import Header from '../../src/sections/header';
import MovieCard from '../../src/components/movie_card';
import { useState } from 'react';

//@ts-ignore
const moviesFetcher = (userId: string) => fetch('http://localhost:8080/seen-movies/' + userId, {credentials: 'include'}).then((res) => res.json())

function UserMovies() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: movieOpen, onOpen: onMovieOpen, onClose: onMovieClose } = useDisclosure();
  const [clickedMovie, setClickedMovie] = useState<SeenMovie>();
  const [clickedRating, setClickedRating] = useState<number>(0);
  const router = useRouter();
  const user_id = router.query.user_id;
  const { data, error } = useSWR(user_id, moviesFetcher)
  if (error) { return <div>failed to load</div> };
  if (!data) { return <div>loading...</div> };
  const clickMovie = (m: SeenMovie) => {
    setClickedMovie(m);
    setClickedRating(m.rating)
    onMovieOpen();
  }
  return (
      <VStack 
        h={{ base: 'auto', md: '100vh' }} 
        w={{ base: 'auto', md: '100%' }}
        p={0}
        m={0}
        spacing={8}>
        <Header />
      <MovieSearch isOpen={isOpen} onClose={onClose} setClickedMovie={setClickedMovie} setClickedRating={setClickedRating} onMovieOpen={onMovieOpen} />
      {clickedMovie !== undefined ? <MovieCard isOpen={movieOpen} onClose={onMovieClose} movie={clickedMovie.movie} 
        clickedRating={clickedRating} setClickedRating={setClickedRating} /> : <></>}
      <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={8}>
        <GridItem key="plus">
          <Image           
            src="https://icons.iconarchive.com/icons/icons8/ios7/512/User-Interface-Plus-icon.png"
            alt="plus"
            size="100%"
            boxSize="100%"
            _hover={{
              cursor: "pointer"
            }}
            onClick={onOpen}
          />
        </GridItem>
        {data.seenMovies !== null ? data.seenMovies.map((sm: any) => (
          <GridItem key={sm.movie.imdbId} onClick={() => clickMovie(sm)}>
            <Movie movie={sm.movie} rating={sm.rating} />
          </GridItem>
        )) : <></>}
      </SimpleGrid>
      </VStack>
  );
}

export default UserMovies;