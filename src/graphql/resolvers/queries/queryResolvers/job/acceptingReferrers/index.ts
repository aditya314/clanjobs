import {
  AcceptingReferrers,
  Job,
  JobAcceptingReferrersArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '@src/graphql/types';
import { Context } from '@src/graphql/context';
import pipe from '@src/graphql/resolvers/commonUtils/pipe';
import IUser from '@src/mongoDb/daoModels/userModel/types';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import {
  accumulateAllReferrerInfo,
  fetchAllEligibleReferrers,
  getQueryToFetchAllEligibleReferrers,
} from '@src/graphql/resolvers/queries/queryResolvers/job/acceptingReferrers/helpers';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';

async function fetchAllReferrersList(
  applicantClans: Array<IClan>,
  companyId: string
): Promise<AcceptingReferrers> {
  return pipe(
    getQueryToFetchAllEligibleReferrers,
    fetchAllEligibleReferrers,
    accumulateAllReferrerInfo
  )({
    applicantClans,
    companyId: companyId,
  });
}

const acceptingReferrersResolver: Resolver<
  ResolversTypes['AcceptingReferrers'],
  Partial<Job>,
  Context,
  RequireFields<JobAcceptingReferrersArgs, 'username'>
> = async (parent: Partial<Job>, args, { session }, info): Promise<AcceptingReferrers> => {
  const { company } = parent;
  const { username } = args;
  const applicant: IUser = await UserModel.findOne({ username });
  return await fetchAllReferrersList(applicant.clans, company.id);
};

export default acceptingReferrersResolver;
