import { Flex, Button, VStack, Box, Heading, Text } from '@chakra-ui/react';
import { getProviders, signIn } from 'next-auth/client';
import React from 'react';
import { FaGithub, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import Header from '@src/components/layout/header';
import Footer from '@src/components/layout/footer';
import Link from 'next/link';
import { map, values } from 'lodash';

const ProviderIconMap = {
  Google: <FaGoogle />,
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedinIn />,
};

const ProviderColourMap = {
  Google: 'orange',
  GitHub: 'gray',
  LinkedIn: 'blue',
};

const getButtonComponentForProvider = provider => {
  return (
    <Button
      size="lg"
      width="100%"
      colorScheme={ProviderColourMap[provider.name]}
      key={provider.id}
      leftIcon={ProviderIconMap[provider.name]}
      onClick={() =>
        signIn(provider.id, {
          callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_SINGIN_CALLBACK,
        })
      }
    >
      Continue with {provider.name}
    </Button>
  );
};

export default function SignIn({
  providers,
}: {
  providers: Array<{
    id: string;
    name: string;
  }>;
}) {
  return (
    <>
      <Header />
      <Flex minH={'100vh'} flexGrow={1} align="center" justify="center">
        <Box align="center">
          <Heading as="h1" size="2xl">
            Log in to ClanJobs
          </Heading>
          <VStack spacing={6} my={12}>
            {map(values(providers), provider => getButtonComponentForProvider(provider))}
          </VStack>
          <Text color="blue.500" textAlign="center">
            <Link href="/signup">Don&apos;t have an account? Sign Up</Link>
          </Text>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
