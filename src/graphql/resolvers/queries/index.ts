import allTodosResolver from './queryResolvers/allTodos';
import todoResolver from './queryResolvers/todo';
import { QueryResolvers } from '../../types';
import userResolver from '@src/graphql/resolvers/queries/queryResolvers/user';
import jobsResolver from '@src/graphql/resolvers/queries/queryResolvers/jobs';
import onboardingUserResolver from '@src/graphql/resolvers/queries/queryResolvers/onboardingUser';
import personalReferralPersonalReferralJobsResolver from '@src/graphql/resolvers/queries/queryResolvers/personalReferralJobs';

const queryResolvers: QueryResolvers = {
  allTodos: allTodosResolver,
  Todo: todoResolver,
  jobs: jobsResolver,
  personalReferralJobs: personalReferralPersonalReferralJobsResolver,
  user: userResolver,
  onboardingUser: onboardingUserResolver,
};

export default queryResolvers;
