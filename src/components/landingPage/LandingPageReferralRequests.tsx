import { Container, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import referralRequestsImage from '@images/landing-page/referral-requests.png';

export default function LandingPageJobDashboardSection() {
  const headingFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });
  const subHeadingFontSize = useBreakpointValue({ base: 'md', md: 'xl' });

  return (
    <Flex bg={'gray.100'} p={[2, 12]} pb={[12, 24]}>
      <Container maxW="7xl">
        <Flex direction={['column-reverse', 'row']} alignItems={'center'} my={4}>
          <Flex boxShadow="2xl">
            <Image
              width={1300}
              height={1000}
              src={referralRequestsImage}
              alt="Referral requests page"
            />
          </Flex>
          <Flex direction="column" p={[0, 8]} width={['100%', '70%']}>
            <Text fontSize={headingFontSize} fontWeight={'bold'} py={4}>
              Shortlist applicants with ease
            </Text>
            <Text
              fontSize={subHeadingFontSize}
              fontWeight={'bold'}
              width={['100%', '75%']}
              color={'gray.500'}
              mb={[4, 0]}
            >
              Shortlist applicant&apos;s referral requests based on their developer profile. View or
              download their full-length resume if you want to analyse more. Communicate application
              status with candidates real time.
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
