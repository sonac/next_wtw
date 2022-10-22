import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalCloseButton, Input, Text, Spinner } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { SeenTitle, TitleInterface } from './title';

interface SeachProps {
    isOpen: boolean;
    onClose: any;
    setClickedSeries: Dispatch<SetStateAction<SeenTitle | undefined>>
    setClickedRating: Dispatch<SetStateAction<number>>
    onSeriesOpen: any;
}

export interface Ids {
    Trakt: number
    Imdb: string
    Slug: string
    Tvdb: number
    Tmdb: number
}

export interface TraktTitle {
    ids: Ids
    title: string
    year: number
}

export const getName = (input: TraktTitle | TitleInterface): string => {
    if ('ids' in input) {
        return input.title
    }
    return input.name
}


const SeriesSearch: React.FC<SeachProps> = ({ isOpen, onClose, setClickedSeries, setClickedRating, onSeriesOpen }: SeachProps ) => {
    const [series, setSeries] = useState<TraktTitle[]|TitleInterface[]>([]);
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
            const data = await resp.json();
            setSeries(data)
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
        const data = await resp.json();
        setSeries(data);
        setLoading(false);
    }

    const clickSeries = async (m: TraktTitle | TitleInterface): Promise<void> => {
        let seenSeries;
        if ('ids' in m) {
            const resp = await fetch(`/api/series-details`, 
                {
                    method: 'POST',
                    body: JSON.stringify(m)    
                }
            )
            const titleDetails: TitleInterface = await resp.json()
            seenSeries = {title: titleDetails, rating: 0, comment: ""};
        } else {
            seenSeries = {title: m, rating: 0, comment: ""};
        }        
        setClickedSeries(seenSeries);
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
                    <div>{series != null ? series.map(m => <Text key={getName(m)} onClick={async () => await clickSeries(m)}
                        _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}
                    >{m.year} {getName(m)}</Text>) : <></>}
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
