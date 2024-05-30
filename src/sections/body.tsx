import { VStack, Heading, Text } from "@chakra-ui/react";

const body = () => {
  return (
    <VStack pt={"40%"}>
      <Heading fontSize="6xl">Welcome to MyList</Heading>
      <Text fontSize="4xl">Here you can track everything</Text>
      <Text fontSize="4xl">All movies that you've wathced</Text>
      <Text fontSize="4xl">All TV Series that you've binged</Text>
    </VStack>
  );
};

export default body;
