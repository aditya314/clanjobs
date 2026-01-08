import InfiniteScroll from 'react-infinite-scroll-component';
import { map, unionBy } from 'lodash';
import React, { useState } from 'react';
import { List, ListItem } from '@chakra-ui/react';
import { apolloGQLClient } from '@pages/_app';
import { ASKED_REFERRALS_PAGINATION_SIZE } from '@src/coreConfigs/constants/common';
import {
  AskedReferralsLoader,
  AskedReferralsPagesCompletedAlert,
} from '@components/askedReferrals/askedReferralsSkeletons';
import AskedReferralsCard from '@components/askedReferrals/askedReferralsCard/askedReferralsCard';
import { GET_ASKED_REFERRAL_PAGINATED } from '@components/askedReferrals/scrollableAskedReferralsList';
import { useSession } from 'next-auth/client';
import { AskedReferralEdge } from '@src/graphql/types';
import { convertEpochToDateString, extractDateFromDateString } from '@src/coreUtils/timeUtils';

const populateMoreAskedReferrals = async (askedReferrals, setAskedReferrals, username, filters) => {
  try {
    if (askedReferrals.hasMore === false) return;
    let paginatedAskedReferralsResponse = await apolloGQLClient.query({
      query: GET_ASKED_REFERRAL_PAGINATED,
      variables: {
        first: ASKED_REFERRALS_PAGINATION_SIZE,
        after: askedReferrals.endCursor,
        username: username,
        filters: filters,
      },
    });
    setAskedReferrals({
      items: unionBy(
        askedReferrals.items,
        paginatedAskedReferralsResponse.data.user.askedReferrals.edges,
        'cursor'
      ),
      hasMore: paginatedAskedReferralsResponse.data.user.askedReferrals.pageInfo.hasNextPage,
      endCursor: paginatedAskedReferralsResponse.data.user.askedReferrals.pageInfo.endCursor,
    });
  } catch (e) {
    console.log('Error fetching asked referrals', JSON.stringify(e));
  }
};
export default function InfiniteAskedReferralsScroll({ data, hasMore, endCursor, filters }) {
  const [session] = useSession();
  const [askedReferrals, setAskedReferrals] = useState({
    items: data,
    hasMore: hasMore,
    endCursor: endCursor,
  });
  return (
    <InfiniteScroll
      dataLength={askedReferrals.items.length}
      next={async () =>
        await populateMoreAskedReferrals(
          askedReferrals,
          setAskedReferrals,
          session.username,
          filters
        )
      }
      hasMore={askedReferrals.hasMore}
      loader={<AskedReferralsLoader />}
      endMessage={<AskedReferralsPagesCompletedAlert />}
    >
      <List spacing={6}>
        {map(askedReferrals.items, (askedReferral: AskedReferralEdge) => (
          <ListItem key={askedReferral.cursor}>
            <AskedReferralsCard
              username={session.username}
              referralRequestId={askedReferral.cursor}
              role={askedReferral.node.jobInfo.jobRole}
              location={askedReferral.node.jobInfo.jobLocation}
              companyName={askedReferral.node.jobInfo.company.name}
              companyLogoUrl={askedReferral.node.jobInfo.company.logoUrl}
              appliedDate={
                askedReferral.node.appliedOn
                  ? extractDateFromDateString(
                      convertEpochToDateString(askedReferral.node.appliedOn)
                    )
                  : ''
              }
              referralState={askedReferral.node.referralState}
              askedReferralStats={askedReferral.node.askedReferralStats}
              jobUrl={askedReferral.node.jobInfo.jobUrl}
            />
          </ListItem>
        ))}
      </List>
    </InfiniteScroll>
  );
}
