import { HamburgerIcon } from "@chakra-ui/icons";
import {
  HStack,
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
import * as React from 'react'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
    <HStack 
      borderBottom="1px solid" 
      w="100vw" 
      h="10vh"
      justify="space-between"
    >
      <IconButton
        backgroundColor="transparent" 
        aria-label="Menu"
        m="3%" 
        onClick={onOpen} 
        icon={<HamburgerIcon boxSize="4em" />} 
      />
      <Text p="3%" fontSize="2xl" >sonac</Text>
    </HStack>
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Navigate</DrawerHeader>
        <DrawerBody>
          <Text>Some content</Text>
        </DrawerBody>
        <DrawerFooter>
          <Text>Footer content</Text>
        </DrawerFooter> 
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default Header;