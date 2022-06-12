import { VStack, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image'

const body = () => {
  return (
    <VStack>
      <Heading fontSize="6xl">Welcome to WTW</Heading>
      <Text fontSize='4xl'>Don't know what to watch?</Text>
      <Text fontSize='4xl'>Don't worry, we got you covered.</Text>
      <Image 
        src="https://m.media-amazon.com/images/M/MV5BMzZjNjIxZjUtNzRmYy00MjRjLWI2NjYtNTc0ZjdmZGRlNDI0XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg" 
        width="100%"
        height="100%"
        />
    </VStack>
  )
}

export default body;