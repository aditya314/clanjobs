import InfiniteScroll from 'react-infinite-scroll-component';
import { map, unionBy } from 'lodash';
import JobBoardPostingCard from '@components/jobDashboard/jobBoardPostingCard';
import { useState } from 'react';
import { SimpleGrid, Heading } from '@chakra-ui/react';
import { GET_JOBS_PAGINATED } from '@components/jobDashboard/jobPaginator';
import { apolloGQLClient } from '@pages/_app';
import { JOB_PAGINATION_SIZE } from '@src/coreConfigs/constants/common';
import { Seniority } from '@src/graphql/types';
import { SENIORITY } from '@src/mongoDb/daoModels/jobModel/types';

const populateMoreJobs = async (jobs, setJobs, username, filters) => {
  try {
    if (jobs.hasMore === false) return;
    let paginatedJobResponse = await apolloGQLClient.query({
      query: GET_JOBS_PAGINATED,
      variables: {
        first: JOB_PAGINATION_SIZE,
        after: jobs.endCursor,
        username: username,
        filters: filters,
      },
    });
    setJobs({
      items: unionBy(jobs.items, paginatedJobResponse.data.jobs.edges, 'cursor'),
      hasMore: paginatedJobResponse.data.jobs.pageInfo.hasNextPage,
      endCursor: paginatedJobResponse.data.jobs.pageInfo.endCursor,
    });
  } catch (e) {
    console.log('Got error', JSON.stringify(e));
  }
};

export default function InfiniteJobScroll({ session, jobsData, hasMore, endCursor, filters }) {
  const [jobs, setJobs] = useState({
    items: jobsData,
    hasMore: hasMore,
    endCursor: endCursor,
  });

  return (
    <InfiniteScroll
      dataLength={jobs.items.length}
      next={async () => await populateMoreJobs(jobs, setJobs, session.username, filters)}
      hasMore={jobs.hasMore}
      loader={
        <Heading as="h2" size="md" color="gray.500" py={2}>
          Fetching jobs for you...
        </Heading>
      }
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={[5, 10]} minChildWidth="16rem">
        {map(jobs.items, edge => (
          <JobBoardPostingCard
            username={session.username}
            key={edge.cursor}
            jobId={edge.cursor}
            role={edge.node.role}
            company={edge.node.company}
            location={edge.node.location}
            postedDate={edge.node.postedDate}
            jobUrl={edge.node.url}
            seniority={SENIORITY[edge.node.seniority]}
            hasEnoughGems={edge.node.hasEnoughGems}
            hasAlreadyRequested={edge.node.hasAlreadyRequested}
            acceptingReferrers={edge.node.acceptingReferrers}
          />
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
}
