import Head from 'next/head';
import { Container, Heading } from '@chakra-ui/react';
import Sidebar from '@src/components/layout/sidebar';
import FilterableReferralRequestsList from '@components/referralRequests/filterableReferralRequestsList';
import { useSession } from 'next-auth/client';
import UnauthorisedPage from '@components/layout/UnauthorisedPage';

export default function ReferralRequests() {
  const [session, sessionLoading] = useSession();
  if (!session && !sessionLoading) {
    return <UnauthorisedPage />;
  }
  if (sessionLoading) {
    return <Heading>Loading</Heading>;
  }
  return (
    <>
      <Head>
        <title>Referral Requests | ClanJobs</title>
      </Head>
      <Sidebar>
        <Container maxW="container.xl" p={4} ml={[0, 10]}>
          <Heading as="h1" size="xl" py={2}>
            Referral Requests
          </Heading>
          <Heading as="h2" size="md" color="gray.500" py={2}>
            Review profiles of applicants who have asked you for referral
          </Heading>
          <FilterableReferralRequestsList />
        </Container>
      </Sidebar>
    </>
  );
}
