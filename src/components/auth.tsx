import {
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    Input,
    Text,
    Button,
    Flex,
    Box,
    useColorModeValue,
    Stack, FormControl, FormLabel, Link
} from '@chakra-ui/react'
import { useState } from 'react';
import useSWR from 'swr'

import { userFetcher } from '../data/user';

interface AuthProps {
    isOpen: boolean;
    onClose: any;
}

const validateEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose }) => {
    const { data, error } = useSWR('auth', userFetcher)
    const [action, setAction] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const sendAuth = async () => {
        /*if (!validateEmail(email)) {
            alert('Invalid email');
            return;
        }*/
        setLoading(true);
        const ep = action === 'Login' ? 'signin' : 'signup';
        const url = `/api/` + ep;
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
        if (resp.status === 200) {
            onClose();
            location.reload()
        } else {
            if (resp.status === 401) {
                alert('Invalid email or password')
            } else if (resp.status === 400) {
                alert('A user with this email already exists')
            } else {
                alert('error occured')
            }
        }
    }

    const logout = () => {
        document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        location.assign("/")
    }

    const getButtonText = (): string => action === 'Login' ? 'Sign in' : 'Sign up'
    const getBottomText = (): string => action === 'Login' ? `Don't have an account yet?` : "Already a user?"

    const isAuthenticated = !(data === null || data === undefined);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"md"} isCentered variant={'auth'}>
            <ModalOverlay />
            <ModalContent>
                {!isAuthenticated ?
                <div>
                <ModalBody>
                    {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                    <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
                        <Stack spacing={4}>
                            <FormControl id={"email"}>
                                <FormLabel>
                                    Email address
                                </FormLabel>
                                <Input type={"email"} onChange={(e) => setEmail(e.target.value)}/>
                            </FormControl>
                            <FormControl id={"password"}>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <Input type={"password"} onChange={(e) => setPassword(e.target.value)}/>
                            </FormControl>
                            <Button bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500' }} onClick={sendAuth}>{getButtonText()}</Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'} fontSize={'sm'}>{getBottomText()} <Link color={'blue.400'}
                                                                                           fontSize={'sm'}
                                                                                           onClick={() => setAction(action === 'Login' ? 'Register': 'Login')}>{action}</Link>
                            </Text>
                        </Stack>
                    </Box>
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
