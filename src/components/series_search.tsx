import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalCloseButton, Input, Text, Spinner } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { json } from 'stream/consumers';
import { SeenTitle, TitleInterface } from './title';

interface SeachProps {
    isOpen: boolean;
    onClose: any;
    setClickedSeries: Dispatch<SetStateAction<SeenTitle | undefined>>
    setClickedRating: Dispatch<SetStateAction<number>>
    onSeriesOpen: any;
}

interface Ids {
    Trakt: number
    Imdb: string
    Slug: string
}

interface TraktShow {
    Ids: Ids
    Title: string
    Year: number
}

//since TraktShow and Series inside DB have different structure - we need safe build of a key
const getKey = (show: TraktShow | TitleInterface ): string => {
    if ('Ids' in show) {
        return show.Ids.Imdb
    }
    return show.imdbId
}

const SeriesSearch: React.FC<SeachProps> = ({ isOpen, onClose, setClickedSeries, setClickedRating, onSeriesOpen }: SeachProps ) => {
    const [movies, setSeries] = useState<TraktShow[]>([]);
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
            setSeries(await resp.json());
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
        setSeries(data);
        setLoading(false);
    }

    const clickMovie = async (m: TraktShow): Promise<void> => {
        const resp = await fetch(`/api/series-details`, 
            {
                method: 'POST',
                body: JSON.stringify(m)    
            }
        )
        const titleDetails: TitleInterface = await resp.json()
        console.log(titleDetails)
        const seenMovie: SeenTitle = {title: titleDetails, rating: 0, comment: ""};
        setClickedSeries(seenMovie);
        setClickedRating(0);
        onSeriesOpen();
    }

    return (
        <Modal isOpen={isOpen} size={'xl'} onClose={() => {setSeries([]); onClose();}} isCentered>
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
                    <div>{movies != null ? movies.map(m => <Text key={getKey(m)} onClick={async () => await clickMovie(m)}
                        _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}
                    >{m.Year} {m.Title}</Text>) : <></>}
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
