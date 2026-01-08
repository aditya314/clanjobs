import {
  PersonalReferralJob,
  PersonalReferralJobHasEnoughGemsArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '@src/graphql/types';
import { Context } from '@src/graphql/context';
import IUser from '@src/mongoDb/daoModels/userModel/types';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import { GemValues } from '@src/coreConfigs/constants/enums';

const hasEnoughGemsResolver: Resolver<
  ResolversTypes['Boolean'],
  Partial<PersonalReferralJob>,
  Context,
  RequireFields<PersonalReferralJobHasEnoughGemsArgs, 'applicantUsername'>
> = async (parent: Partial<PersonalReferralJob>, args, { session }, info): Promise<boolean> => {
  const { applicantUsername } = args;
  const applicantUserData: IUser = await UserModel.findOne({ username: applicantUsername });
  return applicantUserData.gemCount >= GemValues.ASK_REFERRAL;
};

export default hasEnoughGemsResolver;
