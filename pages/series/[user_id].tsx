import useSWR from "swr";
import { useState } from "react";

import { SeenTitle } from "../../src/components/title";
import UserTitles from "../../src/components/user_titles";

//@ts-ignore
const seriesFetcher = () =>
  fetch(`/api/user-series`, { credentials: "include" }).then((res) =>
    res.json()
  );

function UserSeries() {
  const [series, setSeries] = useState<SeenTitle[]>([]);
  const { data, error } = useSWR("seenSeries", seriesFetcher);

  if (error) {
    return <div>failed to load</div>;
  }

  if (data && series.length === 0) {
    setSeries(data);
  }

  return (
    <UserTitles titles={series} endpoint="serie" />
  )
}

export default UserSeries;
