import { Container, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import profilePage from '@images/landing-page/gaurav-sharma-profile.png';
import Image from 'next/image';

export default function LandingPageProfileSection() {
  const headingFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });
  const subHeadingFontSize = useBreakpointValue({ base: 'md', md: 'xl' });
  return (
    <Flex bg={'gray.100'}>
      <Container maxW="7xl">
        <Flex direction={['column', 'row']} alignItems={'center'} my={4}>
          <Flex direction="column" p={[0, 8]} width={['100%', '75%']} mb={[4, 0]}>
            <Text fontSize={headingFontSize} fontWeight={'bold'} py={[2, 4]}>
              Create your unique clan identity
            </Text>
            <Text
              fontSize={subHeadingFontSize}
              fontWeight={'bold'}
              width={['100%', '75%']}
              color={'gray.500'}
            >
              Create developer profile highlighting the best parts of you. You become a clan member
              of all the companies and colleges you have worked or studied in.
            </Text>
          </Flex>
          <Flex boxShadow="2xl">
            <Image width={600} height={800} src={profilePage} alt="Sample profile page of dev" />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
