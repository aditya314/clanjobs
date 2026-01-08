import { Heading } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import { JOB_PAGINATION_SIZE } from '@src/coreConfigs/constants/common';
import InfiniteReferralLinkScroll from '@components/personalReferralLink/infiniteReferralLinkScroll';

export const GET_PERSONAL_REFERRAL_LINK_JOBS = gql`
  query personalReferralLinkJobs(
    $first: Int
    $after: ID
    $referrerUsername: String!
    $applicantUsername: String!
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
          hasAlreadyPersonallyRequested(applicantUsername: $applicantUsername)
          isEligible(applicantUsername: $applicantUsername)
          hasEnoughGems(applicantUsername: $applicantUsername)
        }
      }
    }
  }
`;

export default function ReferralLinkJobList({ referrerUsername, applicantUsername }) {
  const filters = undefined;
  const { loading, error, data } = useQuery(GET_PERSONAL_REFERRAL_LINK_JOBS, {
    variables: {
      first: JOB_PAGINATION_SIZE,
      after: null,
      referrerUsername: referrerUsername,
      applicantUsername: applicantUsername,
      filters: filters,
    },
  });
  if (loading)
    return (
      <Heading as="h2" size="md" color="gray.500" py={2}>
        Fetching jobs form referrer&apos;s company
      </Heading>
    );
  if (error) return <Heading>Failed to load jobs from referrer&apos;s company</Heading>;
  return (
    <InfiniteReferralLinkScroll
      referrerUsername={referrerUsername}
      applicantUsername={applicantUsername}
      jobsData={data.personalReferralJobs.edges}
      hasMore={data.personalReferralJobs.pageInfo.hasNextPage}
      endCursor={data.personalReferralJobs.pageInfo.endCursor}
      filters={filters}
    />
  );
}
