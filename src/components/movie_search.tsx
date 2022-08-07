import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalCloseButton, Input, Text, Spinner } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { SeenTitle, TitleInterface } from './title';
import { TraktTitle, Ids} from './series_search'

interface SeachProps {
    isOpen: boolean;
    onClose: any;
    setClickedMovie: Dispatch<SetStateAction<SeenTitle | undefined>>
    setClickedRating: Dispatch<SetStateAction<number>>
    onMovieOpen: any;
}

interface TraktMovie {

}

const MovieSearch: React.FC<SeachProps> = ({ isOpen, onClose, setClickedMovie, setClickedRating, onMovieOpen }: SeachProps ) => {
    const [movies, setMovies] = useState<TitleInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const searchLocal = async (e: any) => {
        if (e.key == 'Enter') {
            setLoading(true)
            const resp = await fetch(`/api/search-movies-local`, 
                {
                    method: 'POST',
                    body: input
                }
            )
            const d = await resp.json()
            console.log(d)
            setMovies(d);
            setLoading(false);
        }
    }

    const search = async (e: any) => {
        setLoading(true);
        const resp = await fetch(`/api/search-movies`, 
            {
                method: 'POST',
                body: input
            }
        )
        setMovies(await resp.json());
        setLoading(false);
    }

    const clickMovie = async (m: TitleInterface | TraktTitle): Promise<void> => {
        let seenMovie;
        if ('ids' in m) {
            const resp = await fetch(`/api/movie-details`, 
                {
                    method: 'POST',
                    body: JSON.stringify(m)    
                }
            )
            const titleDetails: TitleInterface = await resp.json()
            seenMovie = {title: titleDetails, rating: 0, comment: ""};
        } else {
            seenMovie = {title: m, rating: 0, comment: ""};
        }        
        setClickedMovie(seenMovie);
        setClickedRating(0);
        onMovieOpen();
    }

    return (
        <Modal isOpen={isOpen} size={'xl'} onClose={() => {setMovies([]); onClose();}} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                <Input placeholder='movie name...' size='lg' variant='unstyled'
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={searchLocal}
                />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="rgba(86, 86, 86, 0.1)">
                {loading ? 
                    <Spinner /> : 
                    <div>{movies != null ? movies.map(m => <Text key={m.title} onClick={() => clickMovie(m)}
                        _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}
                    >{m['year']} {m['title']}</Text>) : <></>}
                    <Text key="globalSearch" onClick={search} _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}>
                        ...
                    </Text>
                    </div>
                }
            </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default MovieSearch;
