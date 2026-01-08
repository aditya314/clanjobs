import {
  MutationUpdateUserOnboardingClanInfoArgs,
  OnboardingState,
  UpdateUserOnboardingClanInfoPayload,
} from '@src/graphql/types';
import { UserOnboardingAuthModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel';
import { ONBOARDING_STATE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';
import { reverse, sortBy } from 'lodash';
import { UserOnboardingClanInfoModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel';
import { IEducationInfo } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel/types';
import { ASSETS_BUCKET, ErrorCodes } from '@src/coreConfigs/constants/enums';
import {
  enrichEducationInfo,
  enrichWorkExperienceInfo,
} from '@src/graphql/resolvers/mutations/mutationResolvers/userOnboardingResolvers/updateUserOnboardingClanInfo/helpers';

const updateUserOnboardingClanInfoResolver = async (
  _: any,
  args: MutationUpdateUserOnboardingClanInfoArgs,
  { session }
): Promise<UpdateUserOnboardingClanInfoPayload> => {
  if (!session) {
    throw new Error(ErrorCodes.NOT_AUTHORIZED);
  }
  const {
    email,
    currentDesignation,
    currentCompanyInfo,
    pastCompaniesInfo,
    education,
    resume,
  } = args.input;
  try {
    let workExperienceInfo = await enrichWorkExperienceInfo(currentCompanyInfo, pastCompaniesInfo);

    let educationInfo: Array<IEducationInfo> = await enrichEducationInfo(education);
    if (educationInfo.length <= 0) {
      console.log('Education list is empty');
      throw new Error(ErrorCodes.INVALID_INPUT);
    }
    const sortedEducationInfo = reverse(sortBy(educationInfo, ['yearOfGraduation']));

    await Promise.all([
      UserOnboardingClanInfoModel.updateOne(
        { email: email },
        {
          email: email,
          currentDesignation: currentDesignation,
          currentCompany: workExperienceInfo?.currentCompany,
          pastCompanies: workExperienceInfo?.pastCompanies,
          education: sortedEducationInfo,
          resume: {
            bucketName: resume.bucket,
            key: resume.key,
          },
        },
        { upsert: true }
      ),
      UserOnboardingAuthModel.updateOne(
        { email: email },
        {
          lastCompletedState: ONBOARDING_STATE.CLAN_INFO,
        },
        { upsert: true }
      ),
    ]);
    return {
      onboardingUser: {
        email: email,
        lastCompletedState: OnboardingState.ClanInfo,
      },
    };
  } catch (e) {
    console.log(e);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
};

export default updateUserOnboardingClanInfoResolver;
