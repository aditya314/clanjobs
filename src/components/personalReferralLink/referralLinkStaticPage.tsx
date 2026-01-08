import React from 'react';
import ReferralLinkStaticJobListing from '@components/personalReferralLink/referralLinkStaticJobListing';
import Head from 'next/head';
import Header from '@components/layout/header';
import { Avatar, AvatarGroup, Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import Footer from '@components/layout/footer';
import { isNil } from 'lodash';
import AuthHeader from '@components/layout/AuthHeader';

export default function ReferralLinkStaticPage({ session, referrerInfo, referrerJobsData }) {
  const userFullName = referrerInfo.name;
  const referrerFirstName = userFullName.split(' ')[0];
  const userProfilePic = referrerInfo.profilePicUrl;
  const companyName = referrerInfo.workExperience.currentCompany.name;
  const companyImage = referrerInfo.workExperience.currentCompany.logoUrl;

  return (
    <>
      <Head>
        <title>{referrerFirstName}&apos;s Personal Referral Link | ClanJobs</title>
      </Head>
      {!isNil(session) ? (
        <AuthHeader name={session.user.name} imageSource={session.user.image} />
      ) : (
        <Header />
      )}
      <Box as="main" pt={{ base: 8, md: 16 }} pb={{ base: 24, md: 16 }}>
        <Container maxW="container.lg" p={4}>
          <Heading as="h1" size="xl" py={2}>
            Personal Referral Link from {referrerInfo.name}
          </Heading>
          <Flex alignItems="center">
            <AvatarGroup size="xl" max={2} p={4}>
              <Avatar name={userFullName} src={userProfilePic} />
              <Avatar name={companyName} src={companyImage} />
            </AvatarGroup>
            <Text width="50%" size="lg" fontWeight="semibold" color="gray.500" py={2}>
              <Text as="span" color="black">
                {userFullName}&nbsp;
              </Text>
              is accepting referral requests for job openings at
              <Text as="span" color="black">
                &nbsp;{companyName}
              </Text>
            </Text>
          </Flex>
          <Heading width="100%" size="sm" color="gray.500" my={2} ml={[8, 0]}>
            Job openings at {companyName}
          </Heading>
          <ReferralLinkStaticJobListing referrerJobsData={referrerJobsData} />
        </Container>
      </Box>
      <Footer />
    </>
  );
}
