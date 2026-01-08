import ReactRotatingText from 'react-rotating-text';
import { Text, Box, VStack, Heading, Button } from '@chakra-ui/react';
import styles from '@styles/modules/HeroHome.module.css';
import Container from '@src/components/layout/container';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export default function HeroHome() {
  return (
    <Container maxW={'3xl'}>
      <VStack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading fontWeight="extrabold" fontSize={{ base: '4xl', md: '6xl' }}>
          Get tech job referrals for <br />
          <ReactRotatingText
            className={styles.orangeTextGradient}
            items={[' Amazon', ' Mindtickle', ' Flipkart', ' Microsoft', ' Rubrik', ' Google']}
          />
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'lg', md: 'xl' }} fontWeight={'semibold'}>
          ClanJobs helps you find job referrals for top tech companies easily from classmates and
          coworkers already working in your dream company.
        </Text>
        <Button
          variant="themed"
          size="lg"
          rightIcon={<ArrowForwardIcon />}
          onClick={() => window.open('https://wlwr6uxvluu.typeform.com/to/Kfv9TXSy', '_blank')}
        >
          <Text fontSize={{ base: 'sm', md: 'lg' }}>JOIN WAITLIST FOR BETA</Text>
        </Button>
      </VStack>
    </Container>
  );
}
