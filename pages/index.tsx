import { NextSeo } from 'next-seo';
import Header from '@src/components/layout/header';
import HeroHome from '@src/components/landingPage/heroHome';
import FeatureBlocks from '@src/components/landingPage/featureBlocks';
import PageTransition from '@src/components/common/pageTransition';
import { Box, Flex, Heading } from '@chakra-ui/react';
import Footer from '@src/components/layout/footer';
import Head from 'next/head';
import ClanJobsIntro from '@src/components/landingPage/ClanJobsIntro';
import mixpanel from '@src/mixpanel';

export default function HomePage() {
  mixpanel.track('MIXPANEL_VISIT_APP', {
    page: 'VISITED_APP',
  });
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      <NextSeo
        title="ClanJobs"
        description="Referrals made easy using ClanJobs, Search for Jobs, Ask for Referrals, Review And Manage Referrals"
      />
      <Header />
      <Box as="main" pt={{ base: 16, md: 32 }} pb={{ base: 24, md: 16 }}>
        <PageTransition>
          <HeroHome />
          <ClanJobsIntro />
          <FeatureBlocks />
        </PageTransition>
      </Box>
      <Footer />
    </>
  );
}
