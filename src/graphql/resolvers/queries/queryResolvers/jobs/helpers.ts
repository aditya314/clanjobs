import IJob from '@src/mongoDb/daoModels/jobModel/types';
import { JobFilter, Job, JobConnection, JobEdge, Recency, Seniority } from '@src/graphql/types';
import { has, isNil, map, reduce } from 'lodash';
import {
  companyDBToGQLMapper,
  SENIORITY_TYPE_DB_TO_GQL_MAPPER,
} from '@src/coreUtils/dataParsers/dBToGQLMappers';
import {
  computeEpochGivenRecency,
  computeRecency,
} from '@src/graphql/resolvers/queries/queryResolvers/jobs/utils';
import { checkIfArrayHasValidObjectIDs } from '@src/graphql/resolvers/commonUtils/validators';
import { SENIORITY_TYPE_GQL_TO_DB_MAPPER } from '@src/coreUtils/dataParsers/gQLToDbMappers';
import { ObjectID } from 'bson';
import IUser from '@src/mongoDb/daoModels/userModel/types';
import { GemValues } from '@src/coreConfigs/constants/enums';

export function buildFilteredQuery(query: object, filters: JobFilter, applicantCompanyId?: string) {
  const filterClauses = [];

  if (!isNil(applicantCompanyId)) {
    filterClauses.push({
      'company._id': {
        $ne: applicantCompanyId,
      },
    });
  }
  if (
    has(filters, 'companies') &&
    !isNil(filters.companies) &&
    checkIfArrayHasValidObjectIDs(filters.companies)
  )
    filterClauses.push({
      'company._id': { $in: map(filters.companies, companyId => new ObjectID(companyId)) },
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

  if (has(filters, 'recency') && !isNil(filters.recency))
    filterClauses.push({
      postedDate: { $gte: computeEpochGivenRecency(filters.recency) },
    });

  if (filterClauses.length === 0) return {};
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

export function accumulateEdges(page: Record<string, Job>): Partial<JobConnection> {
  return {
    edges: map(
      Object.keys(page),
      (cursor: string): JobEdge => ({
        node: page[cursor],
        cursor,
      })
    ),
  };
}

export function accumulateNodes(page: Record<string, Job>): Partial<JobConnection> {
  return {
    nodes: map(Object.keys(page), (cursor: string): Job => page[cursor]),
  };
}

export function transformPage(items: Array<IJob>, applicantUserData: IUser): Record<string, Job> {
  return reduce(
    items,
    (acc, item: IJob): Record<string, Job> => {
      return {
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
          hasEnoughGems: applicantUserData.gemCount >= GemValues.ASK_REFERRAL,
          // Pass dummy values for field
          acceptingReferrers: [],
          hasAlreadyRequested: false,
        },
      };
    },
    {}
  );
}
