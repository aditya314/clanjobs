import { UserOnboardingBasicInfoModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';
import { UserOnboardingClanInfoModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel';
import { UserOnboardingProfileInfoModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';
import { ErrorCodes, GemValues } from '@src/coreConfigs/constants/enums';
import { getUserClans } from '@src/graphql/resolvers/mutations/mutationResolvers/userOnboardingResolvers/updateUserOnboardingJobPreference/helpers/clanFetcher';
import IUserOnboardingBasicInfo from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';
import IUserOnboardingClanInfo from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel/types';
import IUserOnboardingProfileInfo from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel/types';
import { UpdateUserOnboardingJobPreferenceInput } from '@src/graphql/types';
import { isNil } from 'lodash';

const accumulateOnboardingDocs = async email => {
  let resolvedPromises = await Promise.all([
    UserOnboardingBasicInfoModel.findOne({
      email: email,
    }),
    UserOnboardingClanInfoModel.findOne({
      email: email,
    }),
    UserOnboardingProfileInfoModel.findOne({
      email: email,
    }),
  ]);
  const userBasicInfo: IUserOnboardingBasicInfo = resolvedPromises[0];
  const userClanInfo: IUserOnboardingClanInfo = resolvedPromises[1];
  const userProfileInfo: IUserOnboardingProfileInfo = resolvedPromises[2];
  return {
    userBasicInfo,
    userClanInfo,
    userProfileInfo,
  };
};

const isUsernameValid = async text =>
  text &&
  text.length !== 0 &&
  /^[a-zA-Z0-9\-]+$/.test(text) &&
  !isNil(await UserModel.findOne({ username: text }));

export const createUserFromOnboardingDocs = async (
  email,
  jobPreferenceInput: UpdateUserOnboardingJobPreferenceInput
) => {
  const { userBasicInfo, userClanInfo, userProfileInfo } = await accumulateOnboardingDocs(email);
  if (userBasicInfo == null || userClanInfo == null || userProfileInfo == null) {
    console.log('Could not fetch from DB', userBasicInfo, userClanInfo, userProfileInfo);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
  try {
    const userClans: Array<IClan> = await getUserClans(
      userClanInfo?.currentCompany,
      userClanInfo?.pastCompanies,
      userClanInfo.education
    );
    let userCreationDBTasks = [];
    const invitedPersonExists =
      (await isUsernameValid(jobPreferenceInput.invitedByUsername)) &&
      jobPreferenceInput.invitedByUsername !== userBasicInfo.username;

    userCreationDBTasks.push(
      UserModel.create({
        email: email,
        name: userBasicInfo.name,
        username: userBasicInfo.username,
        isFresher: userBasicInfo.isFresher,
        yearsOfExperience: userBasicInfo.yearsOfExperience,
        role: userBasicInfo.role,
        skills: userBasicInfo.skills,
        currentDesignation: userClanInfo.currentDesignation,
        currentCompany: userClanInfo?.currentCompany,
        pastCompanies: userClanInfo?.pastCompanies,
        education: userClanInfo.education,
        clans: userClans,
        resume: userClanInfo.resume,
        profilePic: userProfileInfo.profilePic,
        profileHeadline: userProfileInfo.profileHeadline,
        codingProfiles: userProfileInfo.codingProfiles,
        phoneNumber: userProfileInfo.phoneNumber,
        gender: userProfileInfo.gender,
        jobPreferenceInfo: {
          preferredRole: jobPreferenceInput.preferredRole,
          preferredLocations: jobPreferenceInput.preferredLocations,
          preferredCTC: jobPreferenceInput.preferredCTC,
          noticePeriod: jobPreferenceInput.noticePeriod,
        },
        referralSettings: {
          isPublic: true,
          eligibleClans: [],
        },
        signupReason: jobPreferenceInput.signupReason,
        invitedBy: invitedPersonExists ? jobPreferenceInput.invitedByUsername : null,
        gemCount: GemValues.INITIAL_GEMS + (invitedPersonExists ? GemValues.SIGNUP_REFERRAL : 0),
      })
    );
    //TODO: should we also enforce username validation in mongoDB?
    if (invitedPersonExists)
      userCreationDBTasks.push(
        UserModel.updateOne(
          { username: jobPreferenceInput.invitedByUsername },
          {
            $inc: { gemCount: GemValues.SIGNUP_REFERRAL },
          }
        )
      );

    await Promise.all(userCreationDBTasks);
  } catch (e) {
    console.log('Error while executing user creation', e);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
};
