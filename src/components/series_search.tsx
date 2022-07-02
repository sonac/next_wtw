import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalCloseButton, Input, Text, Spinner } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { json } from 'stream/consumers';
import { SeenTitle, TitleInterface } from './title';

interface SeachProps {
    isOpen: boolean;
    onClose: any;
    setClickedMovie: Dispatch<SetStateAction<SeenTitle | undefined>>
    setClickedRating: Dispatch<SetStateAction<number>>
    onMovieOpen: any;
}

interface TraktShow {
    Show: Show
}

interface Ids {
    Trakt: number
    Imdb: string
    Slug: string
}

interface Show {
    Ids: Ids
    Title: string
    Year: number
}


const SeriesSearch: React.FC<SeachProps> = ({ isOpen, onClose, setClickedMovie, setClickedRating, onMovieOpen }: SeachProps ) => {
    const [movies, setMovies] = useState<TraktShow[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const searchLocal = async (e: any) => {
        if (e.key == 'Enter') {
            setLoading(true)
            const resp = await fetch(`/api/search-series-local`, 
                {
                    method: 'POST',
                    body: input
                }
            )
            setMovies(await resp.json());
            setLoading(false);
        }
    }

    const search = async (e: any) => {
        setLoading(true);
        const resp = await fetch(`/api/search-series`, 
            {
                method: 'POST',
                body: input
            }
        )
        console.log(resp);
        const data = await resp.json();
        console.log(data)
        setMovies(data);
        setLoading(false);
    }

    const clickMovie = async (m: TraktShow): Promise<void> => {
        const resp = await fetch(`/api/series-details`, 
            {
                method: 'POST',
                body: JSON.stringify(m.Show)    
            }
        )
        const titleDetails: TitleInterface = await resp.json()
        console.log(titleDetails)
        const seenMovie: SeenTitle = {title: titleDetails, rating: 0, comment: ""};
        setClickedMovie(seenMovie);
        setClickedRating(0);
        onMovieOpen();
    }

    return (
        <Modal isOpen={isOpen} size={'xl'} onClose={() => {setMovies([]); onClose();}} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                <Input placeholder='series name...' size='lg' variant='unstyled'
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={searchLocal}
                />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="rgba(86, 86, 86, 0.1)">
                {loading ? 
                    <Spinner /> : 
                    <div>{movies != null ? movies.map(m => <Text key={m.Show.Title} onClick={async () => await clickMovie(m)}
                        _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}
                    >{m.Show.Year} {m.Show.Title}</Text>) : <></>}
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

export default SeriesSearch;
