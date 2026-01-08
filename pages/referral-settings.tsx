import Head from 'next/head';
import { Container, Heading } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '@src/components/layout/sidebar';
import { useSession } from 'next-auth/client';
import UnauthorisedPage from '@components/layout/UnauthorisedPage';
import ReferralSettingsBody from '@components/referralSettings';

export default function ReferralSettings() {
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
        <title>Referrals Settings | ClanJobs</title>
      </Head>
      <Sidebar>
        <Container maxW="container.xl" p={4} ml={[0, 10]}>
          <Heading as="h1" size="xl" py={2}>
            Referral Settings
          </Heading>
          <Heading as="h2" size="md" color="gray.500" py={2}>
            Configure who can send you referral requests for job openings in your company
          </Heading>
          <ReferralSettingsBody username={session.username} />
        </Container>
      </Sidebar>
    </>
  );
}
