import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import NextHead from 'next/head'

import theme  from '../src/theme/index'
import '../styles/globals.css'
import '../src/theme/styles.css';
import '../public/fonts/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider theme={theme}>
        <NextHead>
          <meta 
            httpEquiv='Content-Security-Policy' 
            content="default-src https://m.media-amazon.com/images/M/ 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src https://m.media-amazon.com/images/M/ 'self';" 
          />
        </NextHead>
        <Component {...pageProps} />
      </ChakraProvider>
  )
}

export default MyApp
