import Head from 'next/head';
import Sidebar from '@components/layout/sidebar';
import { Avatar, AvatarGroup, Container, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import ReferralLinkJobList from '@components/personalReferralLink/referralLinkJobList';

export default function ReferralLinkAuthPage({ session, referrerInfo }) {
  const referrerFullName = referrerInfo.name;
  const referrerFirstName = referrerFullName.split(' ')[0];
  const referrerProfilePic = referrerInfo.profilePicUrl;
  const companyName = referrerInfo.workExperience.currentCompany.name;
  const companyImage = referrerInfo.workExperience.currentCompany.logoUrl;
  const referrerUsername = referrerInfo.username;

  return (
    <>
      <Head>
        <title>{referrerFirstName}&apos;s Personal Referral Link | ClanJobs</title>
      </Head>
      <Sidebar>
        <Container maxW="container.xl" p={4} ml={[0, 10]}>
          <Heading as="h1" size="xl" py={2}>
            Personal Referral Link from {referrerInfo.name}
          </Heading>
          <Flex alignItems="center">
            <AvatarGroup size="xl" max={2} p={4}>
              <Avatar name={referrerFullName} src={referrerProfilePic} />
              <Avatar name={companyName} src={companyImage} />
            </AvatarGroup>
            <Text width="50%" size="lg" fontWeight="semibold" color="gray.500" py={2}>
              <Text as="span" color="black">
                {referrerFullName}&nbsp;
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
          <ReferralLinkJobList
            applicantUsername={session.username}
            referrerUsername={referrerUsername}
          />
        </Container>
      </Sidebar>
    </>
  );
}
