import ReferralLinkSection from '@components/referralSettings/referralLinkSection';
import { Heading } from '@chakra-ui/react';
import PersonalReferralSettingsJobList from '@components/referralSettings/personalReferralSettingsJobList';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { isNil } from 'lodash';

export const GET_USER_REFERRAL_CLANS = gql`
  query user($username: ID!) {
    user(username: $username) {
      username
      clans {
        name
        id
      }
      workExperience {
        currentCompany {
          id
          name
        }
      }
      referralSettings {
        isPublic
        eligibleClans {
          id
          name
          logoUrl
        }
      }
    }
  }
`;

export default function ReferralSettingsBody({ username }) {
  const { loading, error, data, refetch } = useQuery(GET_USER_REFERRAL_CLANS, {
    variables: {
      username: username,
    },
  });
  if (loading)
    return (
      <Heading as="h2" size="md" color="gray.500" py={2}>
        Fetching your referral settings
      </Heading>
    );
  if (error) return <Heading>Failed to load your referral settings</Heading>;
  return !isNil(data.user.workExperience.currentCompany) ? (
    <>
      <ReferralLinkSection
        referralLink={'https://www.clanjobs.com/referrals/' + username}
        clans={data.user.clans}
        companyName={data.user.workExperience.currentCompany.name}
        referralSettings={data.user.referralSettings}
        getUserReferralClansRefetch={refetch}
      />
      <Heading width="100%" size="md" color="gray.500" my={2} ml={[8, 0]}>
        Job openings in your company
      </Heading>
      <PersonalReferralSettingsJobList
        username={username}
        isListOnReferralSettings={true}
        referralSettings={data.user.referralSettings}
      />
    </>
  ) : (
    <Heading>
      You cannot refer anyone if you are not a part of any company. Add your current company to
      create your own referral link
    </Heading>
  );
}
