import useSWR from "swr";
import { useState } from "react";
import UserTitles from "../../src/components/user_titles";
import { SeenTitle } from "../../src/components/title";
import Header from "../../src/sections/header";
import { VStack } from "@chakra-ui/react";

//@ts-ignore
const moviesFetcher = () =>
  fetch(`/api/user-movies`, { credentials: "include" }).then((res) =>
    res.json()
  );

function UserMovies() {
  const [movies, setMovies] = useState<SeenTitle[]>([]);
  const { data, error } = useSWR("seenMovies", moviesFetcher);

  if (error) {
    return <div>failed to load</div>;
  }

  if (data && movies.length === 0) {
    setMovies(data);
  }

  return (    
    <VStack
      h={{ md: "100vh" }}
      w={{ md: "100%" }}
      p={0}
      m={0}
      align="left"
      spacing={8}
    >
      <Header />
      <UserTitles titles={movies} endpoint="movie" />
    </VStack>
  )
}

export default UserMovies;