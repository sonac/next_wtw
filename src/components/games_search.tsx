import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalCloseButton, Input, Text, Spinner } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { SeenTitle, TitleInterface } from './title';

interface SeachProps {
    isOpen: boolean;
    onClose: any;
    setClickedGame: Dispatch<SetStateAction<SeenTitle | undefined>>
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
    firstReleaseDate: number
    posterLink: string
    summary: string
    year: number
}

export interface UserGame {
  game: Game
  rating: number
  dateAdded: Date
  isSynced: boolean
}

const gameToTitle = (game: Game): TitleInterface => {
    return {
        name: game.name,
        posterLink: game.posterLink,
        year: game.year,
        rating: 0,
        ratingCount: 0,
        isSynced: true,
        description: game.summary
    }
}

// After saving game to local db, timestamp gets transformed to normal date
const getYearFromGame = (g: Game): number => {
    if (isNaN(g.firstReleaseDate)) {
        return g.year
    }
    const dt =  new Date(g.firstReleaseDate * 1000);
    return dt.getFullYear();
}


const GamesSearch: React.FC<SeachProps> = ({ isOpen, onClose, setClickedGame, setClickedRating, onGamesOpen }: SeachProps ) => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const searchLocal = async () => {
            setLoading(true)
            const resp = await fetch(`/api/search-games-local`, 
                {
                    method: 'POST',
                    body: input
                }
            )
            const data = await resp.json();
            setGames(data)
            setLoading(false);
    }

    const search = async () => {
        setLoading(true);
        const resp = await fetch(`/api/search-games`, 
            {
                method: 'POST',
                body: input
            }
        )
        const data = await resp.json();
        setGames(data);
        setLoading(false);
    }

    const clickGames = async (m: Game): Promise<void> => {
        let gameDetails: SeenTitle;
        const resp = await fetch(`/api/game-details`, 
            {
                method: 'POST',
                body: JSON.stringify(m)    
            }
        )
        const game: Game = await resp.json()
        gameDetails = {title: gameToTitle(game), rating: 0, comment: '', dateAdded: new Date()};
        setClickedGame(gameDetails);
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
                       onKeyPress={async (evt) => {if (evt.key == "Enter" && evt.shiftKey) await search()}}
                       onKeyDown={async (evt) => {if (evt.key == "Enter") await searchLocal()}}
                />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="rgba(86, 86, 86, 0.1)">
                {loading ? 
                    <Spinner /> : 
                    <div>{games != null ? games.map(m => <Text key={m.id} onClick={async () => await clickGames(m)}
                        _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}
                    >{getYearFromGame(m)} {m.name}</Text>) : <></>}
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
