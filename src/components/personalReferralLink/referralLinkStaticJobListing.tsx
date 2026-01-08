import { keys, map } from 'lodash';
import PersonalReferralSettingsJobCard from '@components/referralSettings/personalReferralSettingsJobCard';
import { SimpleGrid } from '@chakra-ui/react';

export default function ReferralLinkStaticJobListing({ referrerJobsData }) {
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={[5, 10]} minChildWidth="16rem">
        {map(keys(referrerJobsData), jobId => (
          <PersonalReferralSettingsJobCard
            key={jobId}
            jobId={jobId}
            role={referrerJobsData[jobId].role}
            company={referrerJobsData[jobId].company}
            location={referrerJobsData[jobId].location}
            postedDate={referrerJobsData[jobId].postedDate}
            jobUrl={referrerJobsData[jobId].url}
            seniority={referrerJobsData[jobId].seniority}
            isCardOnReferralSettings={false}
            referralSettings={referrerJobsData[jobId].referralSettings}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
