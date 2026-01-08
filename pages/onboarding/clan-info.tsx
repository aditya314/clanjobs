import { useSession } from 'next-auth/client';
import { Box, Container, Heading, Link, Text } from '@chakra-ui/react';
import AuthHeader from '@src/components/layout/AuthHeader';
import UnauthorisedPage from '@src/components/layout/UnauthorisedPage';
import ClanInfoForm from '@src/components/onboarding/clanInfoForm/';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const ClanInfoPage = () => {
  const [session, sessionLoading] = useSession();
  if (!session && !sessionLoading) {
    return <UnauthorisedPage />;
  }
  if (sessionLoading) {
    return <Heading>Loading</Heading>;
  }
  return (
    <>
      <AuthHeader name={session?.user.name} imageSource={session?.user.image} />
      <Box as="main" pt={{ base: 16, md: 32 }} pb={{ base: 24, md: 16 }}>
        <Container maxW="6xl">
          <Text fontSize="3xl" fontWeight={'bold'}>
            Let&apos;s get to know your career journey.
          </Text>
          <Text fontSize="sm" fontWeight={'light'}>
            All the companies and universities you add here should match your uploaded resume.
          </Text>
          <Text fontSize="sm" fontWeight={'light'}>
            Please fill these carefully as we have strict policies against fake profiles.
          </Text>
          <Link
            href="https://discord.gg/rgxDcQcBqC"
            //#clan-addition-request
            color="teal.500"
            isExternal
            fontSize="sm"
          >
            If your company or college is not in the list. Please contact us on our discord server.
            <ExternalLinkIcon mx="2px" />
          </Link>
          <ClanInfoForm session={session} />
        </Container>
      </Box>
    </>
  );
};

export default ClanInfoPage;
