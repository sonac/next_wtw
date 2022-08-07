
import { useRouter } from 'next/router';
import { SimpleGrid, GridItem, VStack, Image, useDisclosure, Menu, MenuButton, 
  MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useSWR from 'swr';
import { useState } from 'react';

import Title, { SeenTitle, TitleInterface } from '../../src/components/title';
import SeriesSearch from '../../src/components/series_search'
import Header from '../../src/sections/header';
import MovieCard from '../../src/components/title_card';

//@ts-ignore
const seriesFetcher = () => fetch(`/api/seen-series`, {credentials: 'include'}).then((res) => res.json())

function UserSeries() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: seriesOpen, onOpen: onSeriesOpen, onClose: onSeriesClose } = useDisclosure();
  const [clickedSeries, setClickedSeries] = useState<SeenTitle>();
  const [series, setSeries] = useState<SeenTitle[]>([]);
  const [clickedRating, setClickedRating] = useState<number>(0);
  const [sortBy, setSorting] = useState<string>('title');
  const router = useRouter();
  const { data, error } = useSWR('seenSeries', seriesFetcher)

  console.log(data)

  if (error) { return <div>failed to load</div> };
  if (data && series.length === 0) {
    setSeries(data)
  }

  const clickMovie = (m: SeenTitle) => {
    setClickedSeries(m);
    setClickedRating(m.rating)
    onSeriesOpen();
  }

  const upsertSeries = async (): Promise<void> => {
      if (clickedSeries === null || clickedSeries === undefined) {
        console.error("failed to upsert movie")
        return
      }
      const seriesToUpsert: TitleInterface = clickedSeries?.title
      seriesToUpsert.dateAdded = new Date()
      const newSeries: SeenTitle = {
          title: seriesToUpsert,
          rating: clickedRating,
          comment: ''
      }
      console.log(newSeries)
      const resp = await fetch(`/api/series`, {
          method: clickedSeries.title.isSynced ? 'PUT' : 'POST',
          body: JSON.stringify(newSeries),
          credentials: 'include'
      })
      if (resp.status === 200) {
          setSeries([...series, newSeries])
          onClose()
          location.reload()
      } else {
          console.error(resp)
      }
    }

  let curSeries = series;


  switch(sortBy) {
    case 'dateAdded':
      curSeries = series.sort((a, b) => new Date(b.title.dateAdded).getTime() - new Date(a.title.dateAdded).getTime())
      break;
    case 'rating':
      curSeries = series.sort((a, b) => b.rating - a.rating)
      break;
    case 'title':
      curSeries = series.sort((a, b) => a.title.title.localeCompare(b.title.title))
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
      <SeriesSearch isOpen={isOpen} onClose={onClose} setClickedSeries={setClickedSeries} setClickedRating={setClickedRating} 
        onSeriesOpen={onSeriesOpen} />
      {clickedSeries !== undefined ? <MovieCard isOpen={seriesOpen} onClose={onSeriesClose} movie={clickedSeries.title} 
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
        {curSeries.map((sm: any) => (
          <GridItem key={sm.title.imdbId} onClick={() => clickMovie(sm)}>
            <Title movie={sm.title} rating={sm.rating} />
          </GridItem>
        ))}
      </SimpleGrid>
      </VStack>
  );
}

export default UserSeries;
