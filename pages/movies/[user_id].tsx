import { useRouter } from 'next/router';
import { SimpleGrid, GridItem, VStack, Image, useDisclosure } from '@chakra-ui/react';
import useSWR from 'swr';

import { MovieInterface, UserResponse } from '../../src/components/movie';
import Movie from '../../src/components/movie';
import MovieSearch from '../../src/components/movie_search'
import Header from '../../src/sections/header';
import { useState } from 'react';

//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

function UserMovies() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const user_id = router.query.user_id;
  const { data, error } = useSWR('http://wtw.triplan.club/seen-movies/' + user_id, fetcher)
  if (error) { return <div>failed to load</div> };
  if (!data) { return <div>loading...</div> };
  return (
      <VStack 
        h={{ base: 'auto', md: '100vh' }} 
        w={{ base: 'auto', md: '100%' }}
        p={0}
        m={0}
        spacing={8}>
        <Header />
      <MovieSearch isOpen={isOpen} onClose={onClose} />
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
        {data.seenMovies.map((sm: any) => (
          <GridItem key={sm.movie.imdbId}>
            <Movie movie={sm.movie} rating={sm.rating}/>
          </GridItem>
        ))}
      </SimpleGrid>
      </VStack>
  );
}

export default UserMovies;