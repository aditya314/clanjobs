import { ResolverParentTypes } from '@graphql-codegen/visitor-plugin-common';
import { Job, JobConnection, QueryJobsArgs, Resolver, ResolversTypes } from '@src/graphql/types';
import { Context } from '@src/graphql/context';
import pipe from '@src/graphql/resolvers/commonUtils/pipe';
import {
  AccumulateJobsPageMetaPayload,
  JobsFetchPagePayload,
  QueryForFetchingJobsPagePayload,
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
import IUser from '@src/mongoDb/daoModels/userModel/types';
import { UserModel } from '@src/mongoDb/daoModels/userModel';

function accumulatePageMeta(input: AccumulateJobsPageMetaPayload): JobConnection {
  const { items, totalCount, first, applicantUserData } = input;
  const jobs: Record<string, Job> = transformPage(items, applicantUserData);

  return {
    ...accumulateNodes(jobs),
    ...accumulateEdges(jobs),
    pageInfo: {
      startCursor: items.length ? items[0]._id : null,
      endCursor: items.length ? items[items.length - 1]._id : null,
      hasPreviousPage: false,
      hasNextPage: items.length ? items.length === first : false,
    },
    totalCount: totalCount,
  };
}

async function fetchPage(input: JobsFetchPagePayload): Promise<AccumulateJobsPageMetaPayload> {
  const { aggregatedQuery, first, applicantUserData } = input;
  const response = await JobModel.aggregate(aggregatedQuery);
  // console.log(JSON.stringify(response));
  return {
    items: response[0].paginatedResults,
    totalCount: response[0].totalCount.length ? response[0].totalCount[0].count : 0,
    first,
    applicantUserData,
  };
}

function getQueryForFetchingPage(input: QueryForFetchingJobsPagePayload): JobsFetchPagePayload {
  const { first, after, filters, applicantUserData } = input;
  const filteredQuery = buildFilteredQuery({}, filters, applicantUserData?.currentCompany?._id);
  const paginatedQuery = generatePaginationQuery(filteredQuery, null, after);
  return {
    aggregatedQuery: getAggregateQueryForFetchingPage(paginatedQuery, first),
    first,
    applicantUserData,
  };
}

const jobsResolver: Resolver<
  ResolversTypes['JobConnection'],
  ResolverParentTypes['Query'],
  Context,
  QueryJobsArgs
> = async (_, args, { session }): Promise<JobConnection> => {
  const { first, after, filters, username } = args;
  const applicantUserData: IUser = await UserModel.findOne({ username });

  return pipe(
    getQueryForFetchingPage,
    fetchPage,
    accumulatePageMeta
  )({ first, after, filters, applicantUserData });
};

export default jobsResolver;
