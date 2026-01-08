import {
  OnboardingUser,
  QueryOnboardingUserArgs,
  Resolver,
  ResolversTypes,
} from '@src/graphql/types';
import { ResolverParentTypes } from '@graphql-codegen/visitor-plugin-common';
import { Context } from '@src/graphql/context';
import { LAST_COMPLETED_STATE_DB_TO_GQL_MAPPER } from '@src/coreUtils/dataParsers/dBToGQLMappers';
import IUserOnboardingAuth from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';
import { UserOnboardingAuthModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel';

async function fetchOnboardingUser({ email }): Promise<{ onboardingUser: IUserOnboardingAuth }> {
  const onboardingUser: IUserOnboardingAuth = await UserOnboardingAuthModel.findOne({ email });
  return { onboardingUser };
}

const onboardingUserResolver: Resolver<
  ResolversTypes['OnboardingUser'],
  ResolverParentTypes['Query'],
  Context,
  QueryOnboardingUserArgs
> = async (_, { email }, { session }): Promise<OnboardingUser> => {
  const { onboardingUser } = await fetchOnboardingUser({
    email,
  });
  return {
    email: onboardingUser.email,
    isFresher: onboardingUser.isFresher,
    username: onboardingUser.username,
    lastCompletedState: LAST_COMPLETED_STATE_DB_TO_GQL_MAPPER[onboardingUser.lastCompletedState],
  };
};
export default onboardingUserResolver;
