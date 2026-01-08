import Header from '@src/components/layout/header';
import { Box, Container, Heading } from '@chakra-ui/react';

export default function UnauthorisedPage() {
  return (
    <>
      <Header />
      <Box as="main" pt={{ base: 16, md: 32 }} pb={{ base: 24, md: 16 }}>
        <Container maxW="6xl">
          <Heading>You are not authenticated. Sign in to continue.</Heading>
        </Container>
      </Box>
    </>
  );
}
