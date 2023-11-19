"use client";

import { useRouter } from "next/router";

const Title: React.FC = ({}) => {
  const { asPath, pathname } = useRouter();
  console.log(asPath);
  console.log(pathname);
  return <div>yo</div>;
};

export default Title;
