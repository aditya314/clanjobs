import IJob from '@src/mongoDb/daoModels/jobModel/types';
import {
  Clan,
  PersonalReferralJob,
  PersonalReferralJobConnection,
  PersonalReferralJobEdge,
  PersonalReferralJobFilter,
  Seniority,
} from '@src/graphql/types';
import { has, isNil, map, reduce } from 'lodash';
import {
  clanDBToGQLMapper,
  companyDBToGQLMapper,
  SENIORITY_TYPE_DB_TO_GQL_MAPPER,
} from '@src/coreUtils/dataParsers/dBToGQLMappers';
import {
  computeEpochGivenRecency,
  computeRecency,
} from '@src/graphql/resolvers/queries/queryResolvers/jobs/utils';
import { SENIORITY_TYPE_GQL_TO_DB_MAPPER } from '@src/coreUtils/dataParsers/gQLToDbMappers';
import { ObjectID } from 'bson';
import IUser from '@src/mongoDb/daoModels/userModel/types';
import IClan, { CLAN_TYPE } from '@src/mongoDb/daoModels/entityModels/clanModel/types';

export function buildFilteredQuery(
  query: object,
  filters: PersonalReferralJobFilter,
  referrerCompanyId
) {
  const filterClauses = [];

  filterClauses.push({
    'company._id': { $eq: new ObjectID(referrerCompanyId) },
  });

  if (has(filters, 'recency') && !isNil(filters.recency))
    filterClauses.push({
      postedDate: { $gte: computeEpochGivenRecency(filters.recency) },
    });

  if (has(filters, 'seniority') && !isNil(filters.seniority))
    filterClauses.push({
      seniority: {
        $in: map(
          filters.seniority,
          (seniority: Seniority) => SENIORITY_TYPE_GQL_TO_DB_MAPPER[seniority]
        ),
      },
    });

  return {
    $and: filterClauses,
  };
}

export function getAggregateQueryForFetchingPage(paginatedQuery: object, first: number) {
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

export function accumulateEdges(
  page: Record<string, PersonalReferralJob>
): Partial<PersonalReferralJobConnection> {
  return {
    edges: map(
      Object.keys(page),
      (cursor: string): PersonalReferralJobEdge => ({
        node: page[cursor],
        cursor,
      })
    ),
  };
}

export function accumulateNodes(
  page: Record<string, PersonalReferralJob>
): Partial<PersonalReferralJobConnection> {
  return {
    nodes: map(Object.keys(page), (cursor: string): PersonalReferralJob => page[cursor]),
  };
}

export function transformPage(
  items: Array<IJob>,
  referrerUserData: IUser
): Record<string, PersonalReferralJob> {
  return reduce<IJob, Record<string, PersonalReferralJob>>(
    items,
    (acc, item: IJob): Record<string, PersonalReferralJob> => ({
      ...acc,
      [item._id.toString()]: {
        company: companyDBToGQLMapper(item.company),
        linkedInUrl: item.linkedInUrl,
        linkedinJobId: item.linkedinJobId,
        location: item.jobLocation,
        recency: computeRecency(item.postedDate),
        role: item.jobRole,
        seniority: SENIORITY_TYPE_DB_TO_GQL_MAPPER[item.seniority],
        url: item.jobUrl,
        postedDate: item.postedDate,
        referrerUsername: referrerUserData.username,
        referralSettings: {
          isPublic: referrerUserData.referralSettings.isPublic,
          eligibleClans: map(
            referrerUserData.referralSettings.eligibleClans,
            (clan: IClan): Clan => clanDBToGQLMapper(clan)
          ),
        },
        // Add dummy data
        hasAlreadyPersonallyRequested: false,
        isEligible: false,
        hasEnoughGems: false,
      },
    }),
    {}
  );
}
