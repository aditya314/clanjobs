import Head from 'next/head';
import Sidebar from '@src/components/layout/sidebar';
import { Container, Heading } from '@chakra-ui/react';
import FilterableAskedReferralsList from '@components/askedReferrals/filterableAskedReferralsList';
import { useSession } from 'next-auth/client';
import UnauthorisedPage from '@components/layout/UnauthorisedPage';

export default function AskedReferrals() {
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
        <title>Asked Referrals | ClanJobs</title>
      </Head>
      <Sidebar>
        <Container maxW="container.xl" p={4} ml={[0, 10]}>
          <Heading as="h1" size="xl" py={2}>
            Asked Referrals
          </Heading>
          <Heading as="h2" size="md" color="gray.500" py={2}>
            Track referral status of jobs you have applied
          </Heading>
          <FilterableAskedReferralsList />
        </Container>
      </Sidebar>
    </>
  );
}
