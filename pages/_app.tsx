import 'focus-visible/dist/focus-visible';
import { AppProps } from 'next/app';
import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, ChakraProvider } from '@chakra-ui/react';
import { Provider as NextAuthProvider } from 'next-auth/client';
import theme from '@theme/index';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch'; // Use node-fetch here to allow SSR
import Head from 'next/head';

export const apolloGQLClient = new ApolloClient({
  link: new HttpLink({ uri: '/api/graphql', fetch: fetch as any }),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: ['username'],
      },
    },
  }),
});

function MobileResponsiveAlert() {
  return (
    <Alert status="error" display={{ base: 'flex', md: 'none' }}>
      <AlertIcon width={5} height={5} />
      <AlertTitle mr={3}>Low Resolution Device Detected</AlertTitle>
      <AlertDescription>
        Site is not completely responsive right now. We recommend using a laptop for best
        experience.
      </AlertDescription>
    </Alert>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ClanJobs</title>
      </Head>
      <NextAuthProvider
        session={pageProps.session}
        options={{
          clientMaxAge: 0,
          keepAlive: 0,
        }}
      >
        <ApolloProvider client={apolloGQLClient}>
          <ChakraProvider theme={theme}>
            {/*<MobileResponsiveAlert />*/}
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </NextAuthProvider>
    </>
  );
}
