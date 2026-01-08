import { useSession } from 'next-auth/client';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import AuthHeader from '@src/components/layout/AuthHeader';
import UnauthorisedPage from '@src/components/layout/UnauthorisedPage';
import BasicInfoForm from '@src/components/onboarding/basicInfoForm/';
import { ONBOARDING_STATE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const redirectToOnboardingPagesBasedOnState = (session, router) => {
  const lastCompletedState = session.lastCompletedState;
  if (lastCompletedState === ONBOARDING_STATE.BASIC_INFO) {
    router.push('/onboarding/clan-info');
  } else if (lastCompletedState === ONBOARDING_STATE.CLAN_INFO) {
    router.push('/onboarding/profile-info');
  } else if (lastCompletedState === ONBOARDING_STATE.PROFILE_INFO) {
    router.push('/onboarding/job-preference');
  } else if (lastCompletedState === ONBOARDING_STATE.JOB_PREFERENCE) {
    router.push('/job-dashboard');
  }
};

const BasicInfoPage = () => {
  const [session, sessionLoading] = useSession();
  const router = useRouter();

  // TODO A flash of job Dashboard appears for an onboarding user
  useEffect(() => {
    if (session) redirectToOnboardingPagesBasedOnState(session, router);
  }, [session, router]);

  // https://stackoverflow.com/questions/62805282/what-is-the-loading-return-value-from-usesession-in-next-auth
  if (session) {
    const firstName = session.user.name.split(' ')[0];
    return (
      <>
        <AuthHeader name={session.user.name} imageSource={session.user.image} />
        <Box as="main" pt={{ base: 16, md: 32 }} pb={{ base: 24, md: 16 }}>
          <Container maxW="6xl">
            <Text fontSize="2xl" fontWeight={'bold'}>
              Hi {firstName}! Let&apos;s get to know you first.
            </Text>
            <BasicInfoForm />
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

export default BasicInfoPage;
