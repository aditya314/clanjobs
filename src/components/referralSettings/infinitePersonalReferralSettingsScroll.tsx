import InfiniteScroll from 'react-infinite-scroll-component';
import { map, unionBy } from 'lodash';
import { useState } from 'react';
import { SimpleGrid, Heading } from '@chakra-ui/react';
import { apolloGQLClient } from '@pages/_app';
import { JOB_PAGINATION_SIZE } from '@src/coreConfigs/constants/common';
import { GET_PERSONAL_REFERRAL_SETTINGS_JOBS } from '@components/referralSettings/personalReferralSettingsJobList';
import PersonalReferralSettingsJobCard from '@components/referralSettings/personalReferralSettingsJobCard';

const populateMoreJobs = async (referrerUsername, jobs, setJobs, filters) => {
  try {
    if (jobs.hasMore === false) return;
    let paginatedJobResponse = await apolloGQLClient.query({
      query: GET_PERSONAL_REFERRAL_SETTINGS_JOBS,
      variables: {
        first: JOB_PAGINATION_SIZE,
        after: jobs.endCursor,
        referrerUsername: referrerUsername,
        filters: filters,
      },
    });
    setJobs({
      items: unionBy(jobs.items, paginatedJobResponse.data.personalReferralJobs.edges, 'cursor'),
      hasMore: paginatedJobResponse.data.personalReferralJobs.pageInfo.hasNextPage,
      endCursor: paginatedJobResponse.data.personalReferralJobs.pageInfo.endCursor,
    });
  } catch (e) {
    console.log('Got error', JSON.stringify(e));
  }
};

export default function InfinitePersonalReferralSettingsScroll({
  referrerUsername,
  jobsData,
  hasMore,
  endCursor,
  filters,
  isListOnReferralSettings,
  referralSettings,
}) {
  const [jobs, setJobs] = useState({
    items: jobsData,
    hasMore: hasMore,
    endCursor: endCursor,
  });

  return (
    <InfiniteScroll
      dataLength={jobs.items.length}
      next={async () => await populateMoreJobs(referrerUsername, jobs, setJobs, filters)}
      hasMore={jobs.hasMore}
      loader={
        <Heading as="h2" size="md" color="gray.500" py={2}>
          Fetching jobs from your company...
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
          <PersonalReferralSettingsJobCard
            key={edge.cursor}
            jobId={edge.cursor}
            role={edge.node.role}
            company={edge.node.company}
            location={edge.node.location}
            postedDate={edge.node.postedDate}
            jobUrl={edge.node.url}
            seniority={edge.node.seniority}
            isCardOnReferralSettings={isListOnReferralSettings}
            referralSettings={referralSettings}
          />
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
}
