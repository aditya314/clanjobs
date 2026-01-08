import {
  MutationUpdateUserOnboardingProfileInfoArgs,
  OnboardingState,
  UpdateUserOnboardingProfileInfoPayload,
} from '@src/graphql/types';
import { UserOnboardingAuthModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel';
import { ONBOARDING_STATE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';
import { UserOnboardingProfileInfoModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel';
import { ASSETS_BUCKET, ErrorCodes } from '@src/coreConfigs/constants/enums';
import { GENDER_GQL_TO_DB_MAPPER } from '@src/coreUtils/dataParsers/gQLToDbMappers';

const updateUserOnboardingProfileInfoResolver = async (
  _: any,
  args: MutationUpdateUserOnboardingProfileInfoArgs,
  { session }
): Promise<UpdateUserOnboardingProfileInfoPayload> => {
  if (!session) {
    throw new Error(ErrorCodes.NOT_AUTHORIZED);
  }
  const { email, profileHeadline, codingProfiles, phoneNumber, gender, profilePic } = args.input;
  try {
    await Promise.all([
      UserOnboardingProfileInfoModel.updateOne(
        { email: email },
        {
          email: email,
          profilePic: profilePic
            ? {
                bucketName: profilePic.bucket,
                key: profilePic.key,
              }
            : null,
          profileHeadline: profileHeadline,
          codingProfiles: codingProfiles,
          phoneNumber: phoneNumber,
          gender: GENDER_GQL_TO_DB_MAPPER[gender],
        },
        { upsert: true }
      ),
      UserOnboardingAuthModel.updateOne(
        { email: email },
        {
          lastCompletedState: ONBOARDING_STATE.PROFILE_INFO,
        },
        { upsert: true }
      ),
    ]);
    return {
      onboardingUser: {
        email: email,
        lastCompletedState: OnboardingState.ProfileInfo,
      },
    };
  } catch (e) {
    console.log(e);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
};

export default updateUserOnboardingProfileInfoResolver;
