import { Heading } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import { JOB_PAGINATION_SIZE } from '@src/coreConfigs/constants/common';
import InfinitePersonalReferralSettingsScroll from '@components/referralSettings/infinitePersonalReferralSettingsScroll';

export const GET_PERSONAL_REFERRAL_SETTINGS_JOBS = gql`
  query personalReferralSettingsJobs(
    $first: Int
    $after: ID
    $referrerUsername: String!
    $filters: PersonalReferralJobFilter
  ) {
    personalReferralJobs(
      first: $first
      after: $after
      referrerUsername: $referrerUsername
      filters: $filters
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          role
          company {
            id
            name
            logoUrl
          }
          location
          url
          recency
          postedDate
          seniority
        }
      }
    }
  }
`;

export default function PersonalReferralSettingsJobList({
  username,
  isListOnReferralSettings,
  referralSettings,
}) {
  const filters = undefined;
  const { loading, error, data } = useQuery(GET_PERSONAL_REFERRAL_SETTINGS_JOBS, {
    variables: {
      first: JOB_PAGINATION_SIZE,
      after: null,
      referrerUsername: username,
      filters: filters,
    },
  });
  if (loading)
    return (
      <Heading as="h2" size="md" color="gray.500" py={2}>
        Fetching jobs form your company
      </Heading>
    );
  if (error) return <Heading>Failed to load jobs from your company</Heading>;
  return (
    <InfinitePersonalReferralSettingsScroll
      referrerUsername={username}
      jobsData={data.personalReferralJobs.edges}
      hasMore={data.personalReferralJobs.pageInfo.hasNextPage}
      endCursor={data.personalReferralJobs.pageInfo.endCursor}
      filters={filters}
      isListOnReferralSettings={isListOnReferralSettings}
      referralSettings={referralSettings}
    />
  );
}
