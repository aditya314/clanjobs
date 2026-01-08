import {
  ReferralRequest,
  ReferralRequestConnection,
  RequireFields,
  Resolver,
  ResolversTypes,
  User,
  UserReferralRequestsArgs,
} from '@src/graphql/types';
import { Context } from '@src/graphql/context';
import {
  AccumulateReferralRequestsPageMetaPayload,
  ReferralRequestsFetchPagePayload,
  QueryForFetchingReferralRequestsPagePayload,
} from './types';
import {
  accumulateEdgesForReferralRequests,
  accumulateNodesForReferralRequests,
  buildFilteredQueryForReferralRequests,
  getAggregateQueryForFetchingReferralRequestsPage,
  transformPageForReferralRequests,
} from './helpers';
import { ReferralRequestModel } from '@src/mongoDb/daoModels/referralModels/referralRequestModel';
import { generatePaginationQuery } from '@src/graphql/resolvers/commonUtils/pagination';
import pipe from '@src/graphql/resolvers/commonUtils/pipe';

function accumulatePageMeta(
  input: AccumulateReferralRequestsPageMetaPayload
): ReferralRequestConnection {
  const { items, totalCount, first, username } = input;
  const referralRequests: Record<string, ReferralRequest> = transformPageForReferralRequests(
    items,
    username
  );
  return {
    ...accumulateNodesForReferralRequests(referralRequests),
    ...accumulateEdgesForReferralRequests(referralRequests),
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
  input: ReferralRequestsFetchPagePayload
): Promise<AccumulateReferralRequestsPageMetaPayload> {
  const { aggregatedQuery, first, username } = input;
  const response = await ReferralRequestModel.aggregate(aggregatedQuery);
  return {
    items: response[0].paginatedResults,
    totalCount: response[0].totalCount.length ? response[0].totalCount[0].count : 0,
    first,
    username,
  };
}

function getQueryForFetchingPage(
  input: QueryForFetchingReferralRequestsPagePayload
): ReferralRequestsFetchPagePayload {
  const { first, after, filters, username } = input;
  const filteredQuery = buildFilteredQueryForReferralRequests(
    {
      'referrersList.username': {
        $eq: username,
      },
    },
    filters
  );
  const paginatedQuery = generatePaginationQuery(filteredQuery, null, after);
  return {
    aggregatedQuery: getAggregateQueryForFetchingReferralRequestsPage(paginatedQuery, first),
    first,
    username,
  };
}

const referralRequestsResolver: Resolver<
  ResolversTypes['ReferralRequestConnection'],
  Partial<User>,
  Context,
  RequireFields<UserReferralRequestsArgs, never>
> = async (parent: Partial<User>, args, { session }): Promise<ReferralRequestConnection> => {
  const { first, after, filters } = args;
  const { username } = parent;
  return pipe(
    getQueryForFetchingPage,
    fetchPage,
    accumulatePageMeta
  )({ first, after, filters, username });
};

export default referralRequestsResolver;
