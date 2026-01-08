import { OnboardingBasicInfo, OnboardingUser } from '@src/graphql/types';
import { UserOnboardingBasicInfoModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';
import IUserOnboardingBasicInfo from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';
import { accumulateSkills } from '@src/graphql/resolvers/queries/queryResolvers/user/helpers';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';

const fetchUserOnboardingBasicInfoDoc = async (email): Promise<IUserOnboardingBasicInfo> =>
  await UserOnboardingBasicInfoModel.findOne({ email: email });

const onboardingBasicInfoResolver = async (
  parent: OnboardingUser,
  args,
  { session }
): Promise<OnboardingBasicInfo> => {
  try {
    const userOnboardingBasicInfo = await fetchUserOnboardingBasicInfoDoc(parent.email);
    return {
      isFresher: userOnboardingBasicInfo.isFresher,
      name: userOnboardingBasicInfo.name,
      role: userOnboardingBasicInfo.role,
      ...accumulateSkills(userOnboardingBasicInfo.skills),
      username: userOnboardingBasicInfo.username,
      yearsOfExperience: userOnboardingBasicInfo.yearsOfExperience,
    };
  } catch (error) {
    console.log(error);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
};

export default onboardingBasicInfoResolver;
