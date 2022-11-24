import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalCloseButton, Input, Text, Spinner } from '@chakra-ui/react'
import { MediaType, SeenTitle, TitleInterface } from './title';

interface SearchProps {
    isOpen: boolean;
    onClose: any;
    setClickedTitle: Dispatch<SetStateAction<SeenTitle | undefined>>;
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
        let userTitle: SeenTitle;
        const resp = await fetch(`/api/${endpoint}-details`, 
            {
                method: 'POST',
                body: JSON.stringify(m)    
            }
        )
        const title: TitleInterface = await resp.json()
        userTitle = {title: title, rating: 0, comment: '', dateAdded: new Date(), isFinished: false};
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
                       onKeyPress={async (evt) => {if (evt.key == "Enter" && evt.shiftKey) await search()}}
                       onKeyDown={async (evt) => {if (evt.key == "Enter") await searchLocal()}}
                />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="rgba(86, 86, 86, 0.1)">
                {loading ? 
                    <Spinner /> : 
                    <div>{titles != null ? titles.map(m => <Text key={m.ids.titleId} onClick={async () => await clickTitle(m)}
                        _hover={{cursor: 'pointer', bg: 'rgba(86, 86, 86, 1)'}}
                    >{m.year} {m.name}</Text>) : <></>}
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

export default TitlesSearch;