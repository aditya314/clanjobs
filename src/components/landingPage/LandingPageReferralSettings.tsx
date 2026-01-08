import { Container, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import ReferralSettingsImage from '@images/landing-page/referral-settings.png';

export default function LandingPageReferralSettings() {
  const headingFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });
  const subHeadingFontSize = useBreakpointValue({ base: 'md', md: 'xl' });

  return (
    <Flex bg={'gray.100'} p={[2, 4]}>
      <Container maxW="7xl">
        <Flex direction={['column', 'row']} alignItems={'center'} my={4}>
          <Flex direction="column" p={[0, 8]} width={['100%', '80%']}>
            <Text fontSize={headingFontSize} fontWeight={'bold'} py={4}>
              No spam from referral requests
            </Text>
            <Text
              fontSize={subHeadingFontSize}
              fontWeight={'bold'}
              width={['100%', '75%']}
              color={'gray.500'}
              mb={[4, 0]}
            >
              Want to keep your referrals private? We got you covered. ClanJobs gives you clan level
              controls on people who can ask you for referrals. Keep it public to get more
              applicants and earn passive income through company referrals.
            </Text>
          </Flex>
          <Flex boxShadow="2xl">
            <Image
              width={'900'}
              height={'1200'}
              src={ReferralSettingsImage}
              alt="Referral Settings Page"
            />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
