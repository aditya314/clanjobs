import { gql, useQuery } from '@apollo/client';
import InfiniteJobScroll from '@components/jobDashboard/infiniteJobScroll';
import { Heading } from '@chakra-ui/react';
import { JOB_PAGINATION_SIZE } from '@src/coreConfigs/constants/common';

export const GET_JOBS_PAGINATED = gql`
  query jobs($first: Int, $after: ID, $username: String!, $filters: JobFilter) {
    jobs(first: $first, after: $after, username: $username, filters: $filters) {
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
          hasEnoughGems
          hasAlreadyRequested(username: $username)
          acceptingReferrers(username: $username) {
            acceptingReferrersPublic {
              userCount
              users {
                username
                name
                profilePicUrl
              }
            }
            acceptingReferrersClanWise {
              users {
                name
                username
                profilePicUrl
              }
              clanInfo {
                id
                name
              }
              userCount
            }
          }
        }
      }
    }
  }
`;

export default function JobPaginator({ session }) {
  const filters = undefined;
  const { loading, error, data } = useQuery(GET_JOBS_PAGINATED, {
    variables: {
      first: JOB_PAGINATION_SIZE,
      after: null,
      username: session.username,
      filters: filters,
    },
  });
  if (loading)
    return (
      <Heading as="h2" size="md" color="gray.500" py={2}>
        Fetching jobs for you...
      </Heading>
    );
  if (error) return <Heading>Failed to load jobs</Heading>;
  return (
    <InfiniteJobScroll
      session={session}
      jobsData={data.jobs.edges}
      hasMore={data.jobs.pageInfo.hasNextPage}
      endCursor={data.jobs.pageInfo.endCursor}
      filters={filters}
    />
  );
}
