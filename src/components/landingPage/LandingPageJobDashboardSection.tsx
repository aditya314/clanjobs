import { Container, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import jobDashboard from '@images/landing-page/job-dashboard-avaiablility.png';

export default function LandingPageJobDashboardSection() {
  const headingFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });
  const subHeadingFontSize = useBreakpointValue({ base: 'md', md: 'xl' });
  return (
    <Flex bg={'gray.100'} p={[2, 12]}>
      <Container maxW="7xl">
        <Flex direction={['column-reverse', 'row']} alignItems={'center'} my={4}>
          <Flex boxShadow="2xl">
            <Image
              width={1200}
              height={800}
              src={jobDashboard}
              alt="availability modal job dashboard"
            />
          </Flex>
          <Flex direction="column" p={[0, 8]} width={['100%', '70%']} mb={[4, 0]}>
            <Text fontSize={headingFontSize} fontWeight={'bold'} py={[2, 4]}>
              Explore thousands of tech jobs
            </Text>
            <Text
              fontSize={subHeadingFontSize}
              fontWeight={'bold'}
              width={['100%', '75%']}
              color={'gray.500'}
            >
              Use the new way of finding hot tech jobs in top product startups and MNCs. Get job
              referrals from people both inside and outside your clan network.
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
