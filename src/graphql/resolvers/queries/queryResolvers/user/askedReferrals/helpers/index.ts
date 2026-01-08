import {
  AskedReferral,
  AskedReferralConnection,
  AskedReferralEdge,
  AskedReferralFilter,
} from '@src/graphql/types';
import { has, isNil, map, reduce } from 'lodash';
import IReferralRequest from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import {
  companyDBToGQLMapper,
  REFERRAL_STATE_DB_TO_GQL_MAPPER,
} from '@src/coreUtils/dataParsers/dBToGQLMappers';
import {
  accumulateAcceptedReferrers,
  accumulateAskedReferralStats,
} from '@src/graphql/resolvers/queries/queryResolvers/user/askedReferrals/helpers/referralStats';

export function buildFilteredQueryForAskedReferrals(query: object, filters: AskedReferralFilter) {
  if (!has(filters, 'referralState') || isNil(filters.referralState)) return query;
  const { referralState } = filters;

  return {
    askedReferralStatus: { $in: referralState },
  };
}

export function getAggregateQueryForFetchingAskedReferralsPage(
  paginatedQuery: object,
  first: number
) {
  return [
    { $match: paginatedQuery },
    {
      $facet: {
        paginatedResults: [{ $limit: first }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ];
}

export function accumulateEdgesForAskedReferrals(
  page: Record<string, AskedReferral>
): Partial<AskedReferralConnection> {
  return {
    edges: map(
      Object.keys(page),
      (cursor: string): AskedReferralEdge => ({
        node: page[cursor],
        cursor,
      })
    ),
  };
}

export function accumulateNodesForAskedReferrals(
  page: Record<string, AskedReferral>
): Partial<AskedReferralConnection> {
  return {
    nodes: map(Object.keys(page), (cursor: string): AskedReferral => page[cursor]),
  };
}

export function transformPageForAskedReferrals(
  items: Array<IReferralRequest>
): Record<string, AskedReferral> {
  return reduce(
    items,
    (acc: Record<string, AskedReferral>, item: IReferralRequest) => ({
      ...acc,
      [item._id.toString()]: {
        appliedOn: item.appliedOn,
        jobInfo: {
          linkedinJobId: item.jobInfo._id.toString(),
          jobLocation: item.jobInfo.jobLocation,
          jobUrl: item.jobInfo.jobUrl,
          jobRole: item.jobInfo.jobRole,
          company: companyDBToGQLMapper(item.jobInfo.company),
        },
        referralState: REFERRAL_STATE_DB_TO_GQL_MAPPER[item.askedReferralStatus],
        askedReferralStats: accumulateAskedReferralStats(item.referrersList),
        acceptedReferrers: accumulateAcceptedReferrers(item.referrersList),
      },
    }),
    {}
  );
}
