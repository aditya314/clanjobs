import { OnboardingProfileInfo, OnboardingUser } from '@src/graphql/types';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';
import { GENDER_DB_TO_GQL_MAPPER } from '@src/coreUtils/dataParsers/dBToGQLMappers';
import IUserOnboardingProfileInfo from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel/types';
import { UserOnboardingProfileInfoModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel';
import { getProfilePicSignedUrl } from '@src/graphql/resolvers/queries/queryResolvers/user/helpers';

const fetchUserOnboardingProfileInfoDoc = async (email): Promise<IUserOnboardingProfileInfo> =>
  await UserOnboardingProfileInfoModel.findOne({ email: email });

const onboardingProfileInfoResolver = async (
  parent: OnboardingUser,
  args,
  { session }
): Promise<OnboardingProfileInfo> => {
  try {
    const userOnboardingProfileInfo = await fetchUserOnboardingProfileInfoDoc(parent.email);
    return {
      codingProfiles: userOnboardingProfileInfo?.codingProfiles,
      gender: GENDER_DB_TO_GQL_MAPPER[userOnboardingProfileInfo.gender],
      phoneNumber: userOnboardingProfileInfo.phoneNumber,
      profileHeadline: userOnboardingProfileInfo?.profileHeadline,
      profilePicUrl: getProfilePicSignedUrl(userOnboardingProfileInfo?.profilePic),
    };
  } catch (error) {
    console.log(error);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
};

export default onboardingProfileInfoResolver;
