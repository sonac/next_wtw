
import { useRouter } from 'next/router';
import { SimpleGrid, GridItem, VStack, Image, useDisclosure, Menu, MenuButton, 
  MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useSWR from 'swr';
import { useState } from 'react';

import Title, { SeenTitle } from '../../src/components/title';
import SeriesSearch from '../../src/components/series_search'
import Header from '../../src/sections/header';
import MovieCard from '../../src/components/title_card';

//@ts-ignore
const moviesFetcher = () => fetch(`/api/seen-series`, {credentials: 'include'}).then((res) => res.json())

function UserSeries() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: seriesOpen, onOpen: onSeriesOpen, onClose: onSeriesClose } = useDisclosure();
  const [clickedMovie, setClickedMovie] = useState<SeenTitle>();
  const [movies, setMovies] = useState<SeenTitle[]>([]);
  const [clickedRating, setClickedRating] = useState<number>(0);
  const [sortBy, setSorting] = useState<string>('title');
  const router = useRouter();
  const { data, error } = useSWR('seenList', moviesFetcher)

  console.log(data)

  if (error) { return <div>failed to load</div> };
  if (data && data.seenMovies && movies.length === 0) {
    setMovies(data.seenMovies)
  }

  const clickMovie = (m: SeenTitle) => {
    setClickedMovie(m);
    setClickedRating(m.rating)
    onSeriesOpen();
  }

  const upsertSeries = async (): Promise<void> => {
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

  console.log(curMovies)

  /*
  switch(sortBy) {
    case 'dateAdded':
      curMovies = movies.sort((a, b) => Date.parse(b.title.dateAdded) - Date.parse(a.title.dateAdded))
      break;
    case 'rating':
      curMovies = movies.sort((a, b) => b.rating - a.rating)
      break;
    case 'title':
      curMovies = movies.sort((a, b) => a.title.title.localeCompare(b.title.title))
      break;
  }*/

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
      <SeriesSearch isOpen={isOpen} onClose={onClose} setClickedSeries={setClickedMovie} setClickedRating={setClickedRating} 
        onSeriesOpen={onSeriesOpen} />
      {clickedMovie !== undefined ? <MovieCard isOpen={seriesOpen} onClose={onSeriesClose} movie={clickedMovie.title} 
        clickedRating={clickedRating} setClickedRating={setClickedRating} upsertTitle={upsertSeries} /> : <></>}
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
            <Title movie={sm.movie} rating={sm.rating} />
          </GridItem>
        ))}
      </SimpleGrid>
      </VStack>
  );
}

export default UserSeries;
