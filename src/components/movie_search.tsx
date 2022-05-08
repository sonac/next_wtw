import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalCloseButton, Input, Text, Spinner } from '@chakra-ui/react'
import { useState } from 'react';

interface SeachProps {
    isOpen: boolean;
    onClose: any;
}

/*
{
        "title": "Crashing",
        "imdbId": "tt5295524",
        "posterLink": "https://m.media-amazon.com/images/M/MV5BM2MyODZlOGMtMzFiNy00N2ExLTg1OGYtOWQ5YjU5YmVlMTAwXkEyXkFqcGdeQXVyMjYwMjMwMzk@._V1_.jpg",
        "year": 2017,
        "rating": 7.7,
        "ratingCount": 19633,
        "isSynced": false
    }
*/

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

//const movies = ['foo', 'nbar', 'super boring movie', 'Steve Jobs']

const MovieSearch: React.FC<SeachProps> = ({ isOpen, onClose }: SeachProps ) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const search = async (e: any) => {
        if (e.key == 'Enter') {
            setLoading(true);
            const resp = await fetch('http://wtw.triplan.club/search', 
                {
                    method: 'POST',
                    body: input
                }
            )
            console.log(resp);
            setMovies(await resp.json());
            setLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} size={'xl'} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                <Input placeholder='movie name...' size='lg' variant='unstyled'
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={search}
                />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="rgba(86, 86, 86, 0.1)">
                {loading ? <Spinner /> : movies.map(m => <Text 
                        _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}
                    >{m['year']} {m['title']}</Text>)}
            </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default MovieSearch;