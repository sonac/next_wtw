import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalCloseButton, Input, Text, Spinner } from '@chakra-ui/react'
import { MediaType, UserTitle, TitleInterface } from './title';

interface SearchProps {
    isOpen: boolean;
    onClose: any;
    setClickedTitle: Dispatch<SetStateAction<UserTitle | undefined>>;
    setClickedRating: Dispatch<SetStateAction<number>>;
    onTitleOpen: any;
    endpoint: string;
}

const TitlesSearch: React.FC<SearchProps> = ({isOpen, onClose, setClickedTitle, setClickedRating, onTitleOpen, endpoint}: SearchProps) => {
    const [titles, setTitles] = useState<TitleInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const searchLocal = async () => {
            setLoading(true)
            const resp = await fetch(`/api/search-${endpoint}s-local`, 
                {
                    method: 'POST',
                    body: input
                }
            )
            const data = await resp.json();
            setTitles(data)
            setLoading(false);
    }

    const search = async () => {
        setLoading(true);
        const resp = await fetch(`/api/search-${endpoint}s`, 
            {
                method: 'POST',
                body: input
            }
        )
        const data = await resp.json();
        setTitles(data);
        setLoading(false);
    }

    const clickTitle = async (m: TitleInterface): Promise<void> => {
        const userTitle: UserTitle = {title: m, rating: 0, comment: '', dateAdded: new Date(), dateFinished: new Date(), isFinished: false, isStarted: true, isAdded: false};;
        if (endpoint === 'game') {
            // for game we need to separately fetch poster url
            const resp = await fetch(`/api/${endpoint}-details`, 
                {
                    method: 'POST',
                    body: JSON.stringify(m)    
                }
            )
            const title: TitleInterface = await resp.json()
            userTitle.title = title;
        }
        setClickedTitle(userTitle);
        setClickedRating(0);
        onTitleOpen();
    }

    return (
        <Modal isOpen={isOpen} size={'xl'} onClose={() => {setTitles([]); onClose();}} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                <Input placeholder='title name...' size='lg' variant='unstyled'
                       onChange={e => setInput(e.target.value)}
                       onKeyPress={async (evt) => {
                            if (evt.key == "Enter" && evt.shiftKey) await search() 
                            else if (evt.key = "Enter") await searchLocal()
                        }}
                       //onKeyDown={async (evt) => {if (evt.key == "Enter" && !evt.shiftKey) await searchLocal()}}
                />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="rgba(86, 86, 86, 0.1)">
                {loading ? 
                    <Spinner /> : 
                    <div>{titles != null ? titles.slice(0, 10).map(m => <Text key={m.ids.titleId} onClick={async () => await clickTitle(m)}
                        _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}
                    >{m.year} {m.name}</Text>) : <></>}
                    <Text fontSize="0.7em" key="globalSearch" onClick={search} _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}>
                        ... press shift+enter to perform global search
                    </Text>
                    </div>
                }
            </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default TitlesSearch;