import {
  AskedReferral,
  AskedReferralConnection,
  RequireFields,
  Resolver,
  ResolversTypes,
  User,
  UserAskedReferralsArgs,
} from '@src/graphql/types';
import { Context } from '@src/graphql/context';
import pipe from '@src/graphql/resolvers/commonUtils/pipe';
import {
  AccumulateAskedReferralsPageMetaPayload,
  AskedReferralsFetchPagePayload,
  QueryForFetchingAskedReferralsPagePayload,
} from './types';
import {
  accumulateEdgesForAskedReferrals,
  accumulateNodesForAskedReferrals,
  buildFilteredQueryForAskedReferrals,
  getAggregateQueryForFetchingAskedReferralsPage,
  transformPageForAskedReferrals,
} from './helpers';
import { generatePaginationQuery } from '@src/graphql/resolvers/commonUtils/pagination';
import { ReferralRequestModel } from '@src/mongoDb/daoModels/referralModels/referralRequestModel';

function accumulatePageMeta(
  input: AccumulateAskedReferralsPageMetaPayload
): AskedReferralConnection {
  const { items, totalCount, first } = input;
  const askedReferrals: Record<string, AskedReferral> = transformPageForAskedReferrals(items);
  return {
    ...accumulateNodesForAskedReferrals(askedReferrals),
    ...accumulateEdgesForAskedReferrals(askedReferrals),
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
  input: AskedReferralsFetchPagePayload
): Promise<AccumulateAskedReferralsPageMetaPayload> {
  const { aggregatedQuery, first } = input;
  const response = await ReferralRequestModel.aggregate(aggregatedQuery);
  // console.log(JSON.stringify(response));
  return {
    items: response[0].paginatedResults,
    totalCount: response[0].totalCount.length ? response[0].totalCount[0].count : 0,
    first,
  };
}

function getQueryForFetchingPage(
  input: QueryForFetchingAskedReferralsPagePayload
): AskedReferralsFetchPagePayload {
  const { first, after, filters, username } = input;
  const filteredQuery = buildFilteredQueryForAskedReferrals(
    {
      'applicantInfo.username': {
        $eq: username,
      },
    },
    filters
  );
  const paginatedQuery = generatePaginationQuery(filteredQuery, null, after);
  return {
    aggregatedQuery: getAggregateQueryForFetchingAskedReferralsPage(paginatedQuery, first),
    first,
  };
}

const askedReferralsResolver: Resolver<
  ResolversTypes['AskedReferralConnection'],
  Partial<User>,
  Context,
  RequireFields<UserAskedReferralsArgs, never>
> = async (parent: Partial<User>, args, { session }): Promise<AskedReferralConnection> => {
  const { first, after, filters } = args;
  const { username } = parent;
  return pipe(
    getQueryForFetchingPage,
    fetchPage,
    accumulatePageMeta
  )({ first, after, filters, username });
};

export default askedReferralsResolver;
