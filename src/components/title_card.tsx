
import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, Flex, Image, Text, Grid, Heading, GridItem, Box, Button } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { TitleInterface, SeenTitle } from './title';

interface CardProps {
    isOpen: boolean;
    onClose: any;
    movie: TitleInterface;
    clickedRating: number;
    setClickedRating: Dispatch<SetStateAction<number>>;
    upsertTitle: () => Promise<void>;
}

interface ImdbMovie {
    title: string;
    imdbId: string;
    posterLink: string;
    year: number;
    rating: number;
    ratingCount: number;
    isSynced: boolean;
    description: string;
}

const MovieCard: React.FC<CardProps> = ({ isOpen, onClose, movie, clickedRating, setClickedRating, upsertTitle: upsertMovie }: CardProps ) => {

    const getBg = (rtng: number): string => {
        if (rtng == clickedRating) {
            return 'rgba(120, 116, 171, 0.52)'
        }
        return 'transparent'
    }


    return (
        <Modal variant={'movie'} isOpen={isOpen} size={'xl'} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalBody bg="rgba(34, 34, 34, 0.7)" w="60vw">
                <Flex flexDirection="row">
                    <Image 
                        src={`${movie.posterLink}`} 
                        alt={movie.title} 
                        minH="50%"
                        maxW="40%"
                        minW="40%"
                        size="50%"
                        boxSize="50%" 
                    />
                    <Flex flexDir="column" p={10} justifyContent='space-between'>
                        <Heading spaddingTop={10} paddingLeft={25} size="2xl" color="white">{movie.title}</Heading>
                        <Grid p={25} templateColumns='repeat(3, 1fr)' justifyContent='space-between' templateRows='repeat(2,1fr)'>
                            <GridItem>
                                <Text fontSize='lg' color="white" fontWeight="bold">Year</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontSize='lg' color="white" fontWeight="bold">Rating</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontSize='lg' color="white" fontWeight="bold">Rating Count</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontSize='lg' color="white" fontWeight="bold">{movie.year}</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontSize='lg' color="white" fontWeight="bold">{movie.rating}</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontSize='lg' color="white" fontWeight="bold">{movie.ratingCount}</Text>
                            </GridItem>
                        </Grid>
                        <Text fontSize='xl' color='white'>{movie.description.length > 0 ? movie.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</Text>
                        <Flex flexDir="row" paddingTop={10} justifyContent='space-between'>
                            <Box bg={getBg(1)} className='rating' color='white' borderWidth='1px' 
                                borderRadius='0.5em' maxH='1.5em' w='1.5em' onClick={() => setClickedRating(1)}>
                                <Text align='center'>1</Text>
                            </Box>
                            <Box bg={getBg(2)} className='rating' color='white' borderWidth='1px' 
                                borderRadius='0.5em' maxH='1.5em' w='1.5em' onClick={() => setClickedRating(2)}>
                                <Text align='center'>2</Text>
                            </Box>
                            <Box bg={getBg(3)} className='rating' color='white' borderWidth='1px' 
                                borderRadius='0.5em' maxH='1.5em' w='1.5em' onClick={() => setClickedRating(3)}>
                                <Text align='center'>3</Text>
                            </Box>
                            <Box bg={getBg(4)} className='rating' color='white' borderWidth='1px' 
                                borderRadius='0.5em' maxH='1.5em' w='1.5em' onClick={() => setClickedRating(4)}>
                                <Text align='center'>4</Text>
                            </Box>
                            <Box bg={getBg(5)} className='rating' color='white' borderWidth='1px' 
                                borderRadius='0.5em' maxH='1.5em' w='1.5em' onClick={() => setClickedRating(5)}>
                                <Text align='center'>5</Text>
                            </Box>
                            <Box bg={getBg(6)} className='rating' color='white' borderWidth='1px' 
                                borderRadius='0.5em' maxH='1.5em' w='1.5em' onClick={() => setClickedRating(6)}>
                                <Text align='center'>6</Text>
                            </Box>
                            <Box bg={getBg(7)} className='rating' color='white' borderWidth='1px' 
                                borderRadius='0.5em' maxH='1.5em' w='1.5em' onClick={() => setClickedRating(7)}>
                                <Text align='center'>7</Text>
                            </Box>
                            <Box bg={getBg(8)} className='rating' color='white' borderWidth='1px' 
                                borderRadius='0.5em' maxH='1.5em' w='1.5em' onClick={() => setClickedRating(8)}>
                                <Text align='center'>8</Text>
                            </Box>
                            <Box bg={getBg(9)} className='rating' color='white' borderWidth='1px' 
                                borderRadius='0.5em' maxH='1.5em' w='1.5em' onClick={() => setClickedRating(9)}>
                                <Text align='center'>9</Text>
                            </Box>
                            <Box bg={getBg(10)} className='rating' color='white' borderWidth='1px' 
                                borderRadius='0.5em' maxH='1.5em' w='1.5em' onClick={() => setClickedRating(10)}>
                                <Text align='center'>10</Text>
                            </Box>
                        </Flex>
                        <Button onClick={upsertMovie}>{movie.isSynced ? 'Update' : 'Add'}</Button>
                    </Flex>
                </Flex>
            </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default MovieCard;
