import { HamburgerIcon } from "@chakra-ui/icons";
import {
  HStack,
  VStack,
  Text,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import * as React from 'react'
import useSWR from "swr";

import Auth from "../components/auth";
import { userFetcher } from "../data/user";


const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: authOpen, onOpen: authOnOpen, onClose: authOnClose } = useDisclosure()
  const { data, error } = useSWR('auth', userFetcher)
  const isAuthenticated = !(data === null || data === undefined);

  //if (error) { return <div>failed to load</div> };
  const btnRef = React.useRef()

  const tobase64 = (s: string) => {
    return Buffer.from(s).toString('base64')
  }


  return (
    <>
    <HStack 
      borderBottom="1px solid" 
      w="100vw" 
      h="10vh"
      justify="space-between"
      paddingRight={10}
    >
      <IconButton
        backgroundColor="transparent" 
        aria-label="Menu"
        m="3%" 
        onClick={onOpen} 
        icon={<HamburgerIcon boxSize="4em" />} 
      />
      <Text fontSize="2xl" _hover={{cursor: "pointer"}} onClick={authOnOpen}>{isAuthenticated ? data : 'LOGIN'}</Text>
    </HStack>
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Navigate</DrawerHeader>
        <DrawerBody paddingTop="10vh">
          <VStack s={20}>
            <Text fontSize="2xl"><Link href="/">Home</Link></Text>
            <Text fontSize="2xl"><Link href={`/movies/${tobase64(data || '')}`}>Movies</Link></Text>
            <Text fontSize="2xl">Netflix Movies</Text>
            <Text fontSize="2xl">My List</Text>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Text>Footer content</Text>
        </DrawerFooter> 
      </DrawerContent>
    </Drawer>
    <Auth isOpen={authOpen} onClose={authOnClose} />
    </>
  )
}

export default Header;