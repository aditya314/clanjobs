import LandingPageProfileSection from '@src/components/landingPage/LandingPageProfileSection';
import LandingPageJobDashboardSection from '@src/components/landingPage/LandingPageJobDashboardSection';
import LandingPageAskedReferrals from '@src/components/landingPage/LandingPageAskedReferrals';
import LandingPagePRLSection from '@src/components/landingPage/LandingPagePRLSection';
import LandingPageReferralSettings from '@src/components/landingPage/LandingPageReferralSettings';
import LandingPageReferralRequests from '@src/components/landingPage/LandingPageReferralRequests';
import { Container, Flex, Heading } from '@chakra-ui/react';

export default function ClanJobsIntro() {
  return (
    <>
      <Flex justifyContent={'center'} py={[8, 12]} bg={'gray.100'}>
        <Heading textAlign={'center'}>Join the new age professional network for developers</Heading>
      </Flex>
      <LandingPageProfileSection />
      <LandingPageJobDashboardSection />
      <LandingPageAskedReferrals />
      <LandingPagePRLSection />
      <LandingPageReferralSettings />
      <LandingPageReferralRequests />
    </>
  );
}
