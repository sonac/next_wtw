import type { NextPage } from 'next'
import { Container, VStack } from '@chakra-ui/react'

import Header from '../src/sections/header';
import Body from '../src/sections/body';

const Home: NextPage = () => {
  return (
    <Container p={0}>
      <VStack 
        h={{ base: 'auto', md: '100vh' }} 
        w={{ base: 'auto', md: '100%' }}
        p={0}
        m={0}
        spacing={8}>
        <Header />
        <Body />
      </VStack>
    </Container>
  )
}

export default Home
