import { useSession } from 'next-auth/client';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import AuthHeader from '@src/components/layout/AuthHeader';
import UnauthorisedPage from '@src/components/layout/UnauthorisedPage';
import JobPreferenceForm from '@components/onboarding/jobPreferenceForm';

const ProfileInfoPage = () => {
  const [session, sessionLoading] = useSession();
  if (!session && !sessionLoading) {
    return <UnauthorisedPage />;
  }
  if (sessionLoading) {
    return <Heading>Loading</Heading>;
  }
  if (session.user) {
    // const firstName = session?.user.name.split(' ')[0];
    return (
      <>
        <AuthHeader name={session?.user.name} imageSource={session?.user.image} />
        <Box as="main" pt={{ base: 16, md: 32 }} pb={{ base: 24, md: 16 }}>
          <Container maxW="6xl">
            <Text fontSize="3xl" fontWeight={'bold'}>
              What kind of jobs are you looking for?
            </Text>
            <JobPreferenceForm />
          </Container>
        </Box>
      </>
    );
  }
};

export default ProfileInfoPage;
