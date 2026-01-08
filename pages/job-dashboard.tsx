import Head from 'next/head';
import { Container, Heading } from '@chakra-ui/react';
import Sidebar from '@src/components/layout/sidebar';
import JobDashboardFiltersSection from '@src/components/jobDashboard/jobDashboardFiltersSection';
import { useSession } from 'next-auth/client';
import UnauthorisedPage from '@components/layout/UnauthorisedPage';
import JobPaginator from '@components/jobDashboard/jobPaginator';

export default function JobDashboard() {
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
        <title>Job Dashboard | ClanJobs </title>
      </Head>
      <Sidebar>
        <Container maxW="container.xl" p={4} ml={[0, 10]}>
          <Heading as="h1" size="xl" py={2}>
            Find job referrals
          </Heading>
          <Heading as="h2" size="md" color="gray.500" py={2}>
            Check out the open positions and ask your referrals here
          </Heading>
          <JobDashboardFiltersSection />
          <JobPaginator session={session} />
        </Container>
      </Sidebar>
    </>
  );
}
