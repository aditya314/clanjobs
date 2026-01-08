import { OnboardingClanInfo, OnboardingUser, S3_Operation } from '@src/graphql/types';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';
import { UserOnboardingClanInfoModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel';
import IUserOnboardingClanInfo from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel/types';
import {
  companyDBToGQLMapper,
  educationInfoDbToGQLMapper,
} from '@src/coreUtils/dataParsers/dBToGQLMappers';
import { map } from 'lodash';
import { generateSignedURL } from '@src/coreUtils/s3Utils';

const fetchUserOnboardingClanInfoDoc = async (email): Promise<IUserOnboardingClanInfo> =>
  await UserOnboardingClanInfoModel.findOne({ email: email });

const onboardingClanInfoResolver = async (
  parent: OnboardingUser,
  args,
  { session }
): Promise<OnboardingClanInfo> => {
  try {
    const userOnboardingClanInfo = await fetchUserOnboardingClanInfoDoc(parent.email);
    return {
      currentCompany: companyDBToGQLMapper(userOnboardingClanInfo?.currentCompany),
      pastCompanies: map(userOnboardingClanInfo?.pastCompanies, companyDBToGQLMapper),
      currentDesignation: userOnboardingClanInfo.currentDesignation,
      education: map(userOnboardingClanInfo.education, educationInfoDbToGQLMapper),
      resumeUrl: generateSignedURL(S3_Operation.GetObject, {
        Bucket: userOnboardingClanInfo.resume.bucketName,
        Key: userOnboardingClanInfo.resume.key,
      }).signedURL,
    };
  } catch (error) {
    console.log(error);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
};

export default onboardingClanInfoResolver;
