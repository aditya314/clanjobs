import React, { useEffect, useState } from 'react';
import { REFERRALS_REQUESTS_PAGINATION_SIZE } from '@src/coreConfigs/constants/common';
import { useSession } from 'next-auth/client';
import { gql, useQuery } from '@apollo/client';
import {
  ReferralRequestsFailureAlert,
  ReferralRequestsLoader,
} from '@components/referralRequests/referralRequestsSkeletons';
import InfiniteReferralRequestsScroll from '@components/referralRequests/infiniteReferralRequestsScroll';

export const GET_REFERRAL_REQUESTS_PAGINATED = gql`
  query fetchReferralRequests(
    $first: Int
    $after: ID
    $username: ID!
    $filters: ReferralRequestFilter
  ) {
    user(username: $username) {
      username
      referralRequests(first: $first, after: $after, filters: $filters) {
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
            applicantInfo {
              name
              networkType
              profilePicUrl
              resumeUrl
              latestCollegeName
              currentDesignation
              companyName
              yearsOfExperience {
                months
                years
              }
            }
            referralState
            appliedOn
          }
        }
      }
    }
  }
`;

export default function ScrollableReferralRequestsList({ filters }) {
  const [session] = useSession();
  const { loading, error, data } = useQuery(GET_REFERRAL_REQUESTS_PAGINATED, {
    variables: {
      first: REFERRALS_REQUESTS_PAGINATION_SIZE,
      after: null,
      username: session.username,
      filters: filters,
    },
  });

  if (loading) return <ReferralRequestsLoader />;
  if (error) return <ReferralRequestsFailureAlert />;

  return (
    <InfiniteReferralRequestsScroll
      data={data.user.referralRequests.edges}
      hasMore={data.user.referralRequests.pageInfo.hasNextPage}
      endCursor={data.user.referralRequests.pageInfo.endCursor}
      filters={filters}
    />
  );
}
