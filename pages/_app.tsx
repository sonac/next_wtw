import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import theme  from '../src/theme/index'
import '../styles/globals.css'
import '../src/theme/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
