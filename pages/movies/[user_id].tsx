import useSWR from "swr";
import { useState } from "react";
import UserTitles from "../../src/components/user_titles";
import { SeenTitle } from "../../src/components/title";

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
    <UserTitles titles={movies} endpoint="movie" />
  )
}

export default UserMovies;