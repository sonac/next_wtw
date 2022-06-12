import { VStack, Heading, Text } from "@chakra-ui/react";

const imgLoader = ({ src, ...props }: any) => {
  return src;
};

const body = () => {
  return (
    <VStack>
      <Heading fontSize="6xl">Welcome to WTW</Heading>
      <Text fontSize="4xl">Don't know what to watch?</Text>
      <Text fontSize="4xl">Don't worry, we got you covered.</Text>
    </VStack>
  );
};

export default body;
