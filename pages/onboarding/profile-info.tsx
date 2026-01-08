import { useSession } from 'next-auth/client';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import AuthHeader from '@src/components/layout/AuthHeader';
import UnauthorisedPage from '@src/components/layout/UnauthorisedPage';
import ProfileInfoForm from '@components/onboarding/profileInfoForm';

const ProfileInfoPage = () => {
  const [session, sessionLoading] = useSession();
  // https://stackoverflow.com/questions/62805282/what-is-the-loading-return-value-from-usesession-in-next-auth
  if (session) {
    const firstName = session?.user.name.split(' ')[0];
    return (
      <>
        <AuthHeader name={session?.user.name} imageSource={session?.user.image} />
        <Box as="main" pt={{ base: 16, md: 32 }} pb={{ base: 24, md: 16 }}>
          <Container maxW="6xl">
            <Text fontSize="2xl" fontWeight={'bold'}>
              Add details to personalise your profile
            </Text>
            <ProfileInfoForm />
          </Container>
        </Box>
      </>
    );
  }
  if (!session && !sessionLoading) {
    return <UnauthorisedPage />;
  }
  if (sessionLoading) {
    return <Heading>Loading</Heading>;
  }
};

export default ProfileInfoPage;
