import { Container, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import PRLImage from '@images/landing-page/PRL.png';

export default function LandingPagePRLSection() {
  const headingFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });
  const subHeadingFontSize = useBreakpointValue({ base: 'md', md: 'xl' });
  return (
    <Flex bg={'gray.100'} p={[2, 12]}>
      <Container maxW="7xl">
        <Flex direction={['column-reverse', 'row']} alignItems={'center'} my={4}>
          <Flex boxShadow="2xl">
            <Image width={800} height={800} src={PRLImage} alt="availability modal job dashboard" />
          </Flex>
          <Flex direction="column" p={[0, 8]} width={['100%', '70%']} mb={[4, 0]}>
            <Text fontSize={headingFontSize} fontWeight={'bold'} py={4}>
              Accept referral requests anywhere with a single link
            </Text>
            <Text
              fontSize={subHeadingFontSize}
              fontWeight={'bold'}
              width={['100%', '75%']}
              color={'gray.500'}
            >
              Create a unique personal link and start accepting personal referral requests on any
              social network. Anyone can apply to your company&apos;s job postings after a quick
              signup. Applicants already on ClanJobs can apply with just a single click!
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
