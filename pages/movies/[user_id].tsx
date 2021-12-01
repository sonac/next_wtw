import { useRouter } from 'next/router';
import { SimpleGrid, GridItem } from '@chakra-ui/react';

import { MovieInterface } from '../../src/components/movie';
import Movie from '../../src/components/movie';

const TestMovies: MovieInterface[] = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    releaseYear: 1994,
    rating: 9.3,
    posterPath: 'https://m.media-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg',
    userRating: 8.9,
  }
];

const UserMovies = () => {
  const router = useRouter();
  const { user_id } = router.query;
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
      {TestMovies.map((movie) => (
        <GridItem key={movie.id}>
          <Movie movie={movie} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
}

export default UserMovies;