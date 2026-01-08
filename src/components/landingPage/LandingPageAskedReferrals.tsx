import { Container, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import askedReferralPage from '@images/landing-page/asked-referral.png';

export default function LandingPageAskedReferrals() {
  const headingFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });
  const subHeadingFontSize = useBreakpointValue({ base: 'md', md: 'xl' });

  return (
    <Flex bg={'gray.100'} p={[2, 12]}>
      <Container maxW="7xl">
        <Flex direction={['column', 'row']} alignItems={'center'} my={4}>
          <Flex direction="column" p={[0, 8]} width={['100%', '80%']} mb={[4, 0]}>
            <Text fontSize={headingFontSize} fontWeight={'bold'} py={[2, 4]}>
              Track all your referral requests
            </Text>
            <Text
              fontSize={subHeadingFontSize}
              fontWeight={'bold'}
              width={['100%', '75%']}
              color={'gray.500'}
            >
              Get real time status of all the referral requests across companies. Acknowledge
              requests to let referrers know that you got an email/call from the company.
            </Text>
          </Flex>
          <Flex boxShadow="2xl">
            <Image width={1100} height={800} src={askedReferralPage} alt="Asked Referral Page" />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
