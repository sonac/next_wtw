import { useRouter } from 'next/router';
import { SimpleGrid, GridItem, Container, VStack } from '@chakra-ui/react';

import { MovieInterface, UserResponse } from '../../src/components/movie';
import Movie from '../../src/components/movie';
import Header from '../../src/sections/header';

//TODO: add getStaticPaths when backend is done

export async function getStaticProps({ params }: any) {
  const res = await fetch(`http://wtw.triplan.club/movies/${params.user_id}`);
  const data: UserResponse = await res.json();
  const movies = data.seenMovies;
  return {props: { movies }};
}

function UserMovies({ seenMovies }: UserResponse) {
  const router = useRouter();
  const { user_id } = router.query;
  return (
      <VStack 
        h={{ base: 'auto', md: '100vh' }} 
        w={{ base: 'auto', md: '100%' }}
        p={0}
        m={0}
        spacing={8}>
        <Header />
      <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={8}>
        {seenMovies.map((sm) => (
          <GridItem key={sm.movie.imdbId}>
            <Movie movie={sm.movie} />
          </GridItem>
        ))}
      </SimpleGrid>
      </VStack>
  );
}

export default UserMovies;