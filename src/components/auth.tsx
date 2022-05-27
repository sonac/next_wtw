import { Modal, ModalBody, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, Input, Text, Button, Flex, Spinner } from '@chakra-ui/react'
import { useState } from 'react';
import useSWR from 'swr'

import { userFetcher } from '../data/user';

interface AuthProps {
    isOpen: boolean;
    onClose: any;
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose }) => {
    const { data, error } = useSWR('auth', userFetcher)
    const [action, setAction] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const sendAuth = async () => {
        setLoading(true);
        const ep = action === 'Login' ? 'signin' : 'signup';
        const url = `http://server.triplan.club/` + ep;
        console.log(url)
        const payload = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: 'include',
        }
        console.log(payload)
        //@ts-ignore
        const resp = await fetch(url, payload)
        setLoading(false);
        onClose();
        location.reload()
    }

    const logout = () => {
        document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        location.reload()
    }

    const isAuthenticated = !(data === null || data === undefined);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"md"} isCentered variant={'auth'}>
            <ModalOverlay />
            <ModalContent>
                {!isAuthenticated ?
                <div>
                <ModalHeader m='0' p='0'>
                    <Flex m={'0'} p={'0'} minHeight={"100%"} justifyContent='space-between' pr={"10%"}>
                        <Text variant={'button'} p='10px' paddingLeft={'12%'} 
                            borderRight={"1px black solid"} minW='50%' bg={(action === 'Login') ? 'blue' : ''}
                            onClick={() => setAction('Login')}>LOGIN</Text>
                        <Text variant={'button'} p='10px' paddingLeft={'5%'} minW='50%'
                            bg={(action === 'Register') ? 'blue' : ''} onClick={() => setAction('Register')}>REGISTER</Text>
                    </Flex>
                        <ModalCloseButton m='auto' paddingTop={'5%'} paddingLeft='2%'/>
                </ModalHeader>
                <ModalBody>
                    <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" onKeyDown={(k) => {if (k.key == 'Enter') sendAuth()}} onChange={(e) => setPassword(e.target.value)}/>
                    <Button color="blue" mt={4} onClick={sendAuth}  >{loading ? <Spinner/> : action}</Button>
                </ModalBody></div> : (
                <div>
                    <ModalBody>
                        <Button onClick={logout}>LOGOUT</Button>
                    </ModalBody>
                </div>)}
            </ModalContent>
        </Modal>
    )
}

export default Auth;
