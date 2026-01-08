import { ResolverParentTypes } from '@graphql-codegen/visitor-plugin-common';
import {
  PersonalReferralJob,
  PersonalReferralJobConnection,
  QueryPersonalReferralJobsArgs,
  Resolver,
  ResolversTypes,
} from '@src/graphql/types';
import { Context } from '@src/graphql/context';
import pipe from '@src/graphql/resolvers/commonUtils/pipe';
import {
  AccumulatePersonalReferralJobsPageMetaPayload,
  PersonalReferralJobsFetchPagePayload,
  QueryForFetchingPersonalReferralJobsPagePayload,
} from './types';
import { generatePaginationQuery } from '@src/graphql/resolvers/commonUtils/pagination';
import { JobModel } from '@src/mongoDb/daoModels/jobModel';
import {
  accumulateEdges,
  accumulateNodes,
  buildFilteredQuery,
  getAggregateQueryForFetchingPage,
  transformPage,
} from './helpers';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import IUser from '@src/mongoDb/daoModels/userModel/types';

function accumulatePageMeta(
  input: AccumulatePersonalReferralJobsPageMetaPayload
): PersonalReferralJobConnection {
  const { referrerUserData, items, totalCount, first } = input;
  const personalReferralPersonalReferralJobs: Record<string, PersonalReferralJob> = transformPage(
    items,
    referrerUserData
  );

  return {
    ...accumulateNodes(personalReferralPersonalReferralJobs),
    ...accumulateEdges(personalReferralPersonalReferralJobs),
    pageInfo: {
      startCursor: items.length ? items[0]._id : null,
      endCursor: items.length ? items[items.length - 1]._id : null,
      hasPreviousPage: false,
      hasNextPage: items.length ? items.length === first : false,
    },
    totalCount: totalCount,
  };
}

async function fetchPage(
  input: PersonalReferralJobsFetchPagePayload
): Promise<AccumulatePersonalReferralJobsPageMetaPayload> {
  const { referrerUserData, aggregatedQuery, first } = input;
  const response = await JobModel.aggregate(aggregatedQuery);
  return {
    items: response[0].paginatedResults,
    totalCount: response[0].totalCount.length ? response[0].totalCount[0].count : 0,
    first,
    referrerUserData,
  };
}

function getQueryForFetchingPage(
  input: QueryForFetchingPersonalReferralJobsPagePayload
): PersonalReferralJobsFetchPagePayload {
  const { referrerUserData, first, after, filters } = input;
  const filteredQuery = buildFilteredQuery({}, filters, referrerUserData.currentCompany._id);
  const paginatedQuery = generatePaginationQuery(filteredQuery, null, after);
  return {
    aggregatedQuery: getAggregateQueryForFetchingPage(paginatedQuery, first),
    first,
    referrerUserData,
  };
}

const personalReferralPersonalReferralJobsResolver: Resolver<
  ResolversTypes['PersonalReferralJobConnection'],
  ResolverParentTypes['Query'],
  Context,
  QueryPersonalReferralJobsArgs
> = async (_, args, { session }): Promise<PersonalReferralJobConnection> => {
  const { first, after, filters, referrerUsername } = args;
  const referrerUserData: IUser = await UserModel.findOne({ username: referrerUsername });
  return pipe(
    getQueryForFetchingPage,
    fetchPage,
    accumulatePageMeta
  )({ referrerUserData, first, after, filters });
};

export default personalReferralPersonalReferralJobsResolver;
