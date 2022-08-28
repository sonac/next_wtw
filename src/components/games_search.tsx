import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalCloseButton, Input, Text, Spinner } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { SeenTitle, TitleInterface } from './title';

interface SeachProps {
    isOpen: boolean;
    onClose: any;
    setClickedGames: Dispatch<SetStateAction<UserGame | undefined>>
    setClickedRating: Dispatch<SetStateAction<number>>
    onGamesOpen: any;
}

export interface Ids {
    Trakt: number
    Imdb: string
    Slug: string
    Tvdb: number
    Tmdb: number
}

export interface Game {
    name: string
    id: number
    first_release_date: number
}

export interface UserGame {
  game: Game
  rating: number
  dateAdded: Date
  isSynced: boolean
}

const yearFromTs = (ts: number): number => {
    const dt =  new Date(ts * 1000);
    return dt.getFullYear();
}


const GamesSearch: React.FC<SeachProps> = ({ isOpen, onClose, setClickedGames, setClickedRating, onGamesOpen }: SeachProps ) => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const searchLocal = async (e: any) => {
        if (e.key == 'Enter') {
            setLoading(true)
            const resp = await fetch(`/api/search-games-local`, 
                {
                    method: 'POST',
                    body: input
                }
            )
            const data = await resp.json();
            console.log(data)
            setGames(data)
            setLoading(false);
        }
    }

    const search = async (e: any) => {
        setLoading(true);
        const resp = await fetch(`/api/search-games`, 
            {
                method: 'POST',
                body: input
            }
        )
        const data = await resp.json();
        console.log(data)
        setGames(data);
        setLoading(false);
    }

    const clickGames = async (m: Game): Promise<void> => {
        let seenGames;
        const resp = await fetch(`/api/games-details`, 
            {
                method: 'POST',
                body: JSON.stringify(m)    
            }
        )
        const titleDetails: Game = await resp.json()
        seenGames= {game: titleDetails, rating: 0, dateAdded: new Date(), isSynced: false};
        setClickedGames(seenGames);
        setClickedRating(0);
        onGamesOpen();
    }

    return (
        <Modal isOpen={isOpen} size={'xl'} onClose={() => {setGames([]); onClose();}} isCentered>
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
                    <div>{games != null ? games.map(m => <Text key={m.id} onClick={async () => await clickGames(m)}
                        _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}
                    >{yearFromTs(m.first_release_date)} {m.name}</Text>) : <></>}
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

export default GamesSearch;
