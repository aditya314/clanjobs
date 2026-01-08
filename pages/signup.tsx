import { Flex, Button, VStack, Stack, Box, Heading, Text } from '@chakra-ui/react';
import { getProviders, signIn } from 'next-auth/client';
import React from 'react';
import { FaGithub, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import Header from '@src/components/layout/header';
import Footer from '@src/components/layout/footer';
import Image from '@src/components/common/image';
import wolfLogo from '@images/wolfLogo.png';
import Link from 'next/link';
import { map, values } from 'lodash';
import GridListWithHeading from '@src/components/onboarding/signupMessage';

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
          callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_SINGUP_CALLBACK,
        })
      }
    >
      Continue with {provider.name}
    </Button>
  );
};

export default function SignUp({
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
      {/*<Flex minH={'100vh'} flexGrow={1} align="center">*/}
      <Flex direction={['column', 'row']}>
        <Box px={[6, 24]} py={[6, 40]} flex={1} align={'center'} justify={'start'}>
          <Heading as="h1" textAlign={['center', 'left']}>
            Join the referral search network for developers
          </Heading>
          <VStack spacing={6} my={12}>
            {map(values(providers), provider => getButtonComponentForProvider(provider))}
          </VStack>
          <Text color="blue.500" textAlign={['center', 'left']}>
            <Link href="/signin">Already have an account? Log In</Link>
          </Text>
        </Box>
        <Box px={[2, 12]} py={[2, 40]} flex={1} bg="gray.100">
          {/* TODO Handle In Mobile Layouts} */}
          <GridListWithHeading />
          {/*<Image src={wolfLogo} width="200px" height="200px" alt="ClanJobs Mascot" />*/}
        </Box>
      </Flex>
      {/*</Flex>*/}
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
