import InfiniteScroll from 'react-infinite-scroll-component';
import { map, unionBy } from 'lodash';
import React, { useState } from 'react';
import { List, ListItem } from '@chakra-ui/react';
import { apolloGQLClient } from '@pages/_app';
import { REFERRALS_REQUESTS_PAGINATION_SIZE } from '@src/coreConfigs/constants/common';
import { useSession } from 'next-auth/client';
import { ReferralRequestEdge } from '@src/graphql/types';
import { convertEpochToDateString, extractDateFromDateString } from '@src/coreUtils/timeUtils';
import { GET_REFERRAL_REQUESTS_PAGINATED } from '@components/referralRequests/scrollableReferralRequestsList';
import {
  ReferralRequestsLoader,
  ReferralRequestsPagesCompletedAlert,
} from '@components/referralRequests/referralRequestsSkeletons';
import ReferralRequestCard from '@components/referralRequests/referralRequestCard';
import { REFERRAL_STATE_DB_TO_GQL_MAPPER } from '@src/coreUtils/dataParsers/dBToGQLMappers';
import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';

const populateMoreReferralRequests = async (
  referralRequests,
  setReferralRequests,
  username,
  filters
) => {
  try {
    if (referralRequests.hasMore === false) return;
    let paginatedReferralRequestsResponse = await apolloGQLClient.query({
      query: GET_REFERRAL_REQUESTS_PAGINATED,
      variables: {
        first: REFERRALS_REQUESTS_PAGINATION_SIZE,
        after: referralRequests.endCursor,
        username: username,
        filters: filters,
      },
    });
    setReferralRequests({
      items: unionBy(
        referralRequests.items,
        paginatedReferralRequestsResponse.data.user.referralRequests.edges,
        'cursor'
      ),
      hasMore: paginatedReferralRequestsResponse.data.user.referralRequests.pageInfo.hasNextPage,
      endCursor: paginatedReferralRequestsResponse.data.user.referralRequests.pageInfo.endCursor,
    });
  } catch (e) {
    console.log('Error fetching asked referrals', JSON.stringify(e));
  }
};
export default function InfiniteReferralRequestsScroll({ data, hasMore, endCursor, filters }) {
  const [session] = useSession();
  const [referralRequests, setReferralRequests] = useState({
    items: data,
    hasMore: hasMore,
    endCursor: endCursor,
  });
  return (
    <InfiniteScroll
      dataLength={referralRequests.items.length}
      next={async () =>
        await populateMoreReferralRequests(
          referralRequests,
          setReferralRequests,
          session.username,
          filters
        )
      }
      hasMore={referralRequests.hasMore}
      loader={<ReferralRequestsLoader />}
      endMessage={<ReferralRequestsPagesCompletedAlert />}
    >
      <List spacing={6}>
        {map(referralRequests.items, (referralRequest: ReferralRequestEdge) => (
          <ListItem key={referralRequest.cursor}>
            <ReferralRequestCard
              username={session.username}
              referralRequestId={referralRequest.cursor}
              applicantName={referralRequest.node.applicantInfo.name}
              applicantImageSrc={referralRequest.node.applicantInfo.profilePicUrl}
              yearsOfExperience={referralRequest.node.applicantInfo.yearsOfExperience}
              role={referralRequest.node.jobInfo.jobRole}
              location={referralRequest.node.jobInfo.jobLocation}
              companyName={referralRequest.node.jobInfo.company.name}
              collegeName={referralRequest.node.applicantInfo.latestCollegeName}
              appliedDate={
                referralRequest.node.appliedOn
                  ? extractDateFromDateString(
                      convertEpochToDateString(referralRequest.node.appliedOn)
                    )
                  : ''
              }
              referralRequestState={REFERRAL_STATE[referralRequest.node.referralState]}
            />
          </ListItem>
        ))}
      </List>
    </InfiniteScroll>
  );
}
