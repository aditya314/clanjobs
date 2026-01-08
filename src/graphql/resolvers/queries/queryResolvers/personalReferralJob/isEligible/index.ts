import {
  PersonalReferralJob,
  PersonalReferralJobIsEligibleArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '@src/graphql/types';
import { Context } from '@src/graphql/context';
import { filter, intersection, isNil } from 'lodash';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import IUser from '@src/mongoDb/daoModels/userModel/types';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';

function getUserData(usersData: Array<IUser>, username: string): IUser {
  const userData = filter(usersData, (user: IUser) => user.username === username);
  if (userData.length === 0) throw new Error(ErrorCodes.INVALID_INPUT);
  return userData[0];
}

const isEligibleResolver: Resolver<
  ResolversTypes['Boolean'],
  Partial<PersonalReferralJob>,
  Context,
  RequireFields<PersonalReferralJobIsEligibleArgs, 'applicantUsername'>
> = async (parent: Partial<PersonalReferralJob>, args, { session }, info): Promise<boolean> => {
  const { referrerUsername } = parent;
  const { applicantUsername } = args;
  const usersData: Array<IUser> = await UserModel.find({
    username: {
      $in: [referrerUsername, applicantUsername],
    },
  });
  const referrerUserData = getUserData(usersData, referrerUsername);
  const applicantUserData = getUserData(usersData, applicantUsername);
  if (applicantUserData?.currentCompany._id === referrerUserData.currentCompany._id) return false;
  if (referrerUserData.referralSettings.isPublic) return true;
  return (
    intersection(referrerUserData.referralSettings.eligibleClans, applicantUserData.clans)
      .length !== 0
  );
};

export default isEligibleResolver;
