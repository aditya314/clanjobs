import React, { useEffect, useState } from 'react';
import { ASKED_REFERRALS_PAGINATION_SIZE } from '@src/coreConfigs/constants/common';
import { useSession } from 'next-auth/client';
import { gql, useQuery } from '@apollo/client';
import {
  AskedReferralsFailureAlert,
  AskedReferralsLoader,
} from '@components/askedReferrals/askedReferralsSkeletons';
import InfiniteAskedReferralsScroll from '@components/askedReferrals/infiniteAskedReferralsScroll';

export const GET_ASKED_REFERRAL_PAGINATED = gql`
  query fetchAskedReferrals(
    $first: Int
    $after: ID
    $username: ID!
    $filters: AskedReferralFilter
  ) {
    user(username: $username) {
      username
      askedReferrals(first: $first, after: $after, filters: $filters) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            jobInfo {
              jobUrl
              jobRole
              jobLocation
              company {
                name
                logoUrl
              }
            }
            appliedOn
            referralState
            askedReferralStats {
              referralState
              referrerCount
            }
            acceptedReferrers
          }
        }
      }
    }
  }
`;

export default function ScrollableAskedReferralsList({ filters }) {
  const [session] = useSession();
  // console.log(session);
  const { loading, error, data } = useQuery(GET_ASKED_REFERRAL_PAGINATED, {
    variables: {
      first: ASKED_REFERRALS_PAGINATION_SIZE,
      after: null,
      username: session.username,
      filters: filters,
    },
  });

  if (loading) return <AskedReferralsLoader />;
  if (error) return <AskedReferralsFailureAlert />;

  return (
    <InfiniteAskedReferralsScroll
      data={data.user.askedReferrals.edges}
      hasMore={data.user.askedReferrals.pageInfo.hasNextPage}
      endCursor={data.user.askedReferrals.pageInfo.endCursor}
      filters={filters}
    />
  );
}
