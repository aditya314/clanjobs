import IUser, { IJobPreferenceInfo } from '@src/mongoDb/daoModels/userModel/types';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import { S3_Operation, User } from '@src/graphql/types';
import ISkill from '@src/mongoDb/daoModels/entityModels/skillModel/types';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';
import ICompany from '@src/mongoDb/daoModels/entityModels/companyModel/types';
import { IEducationInfo } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel/types';
import { generateSignedURL } from '@src/coreUtils/s3Utils';
import { map } from 'lodash';
import {
  clanDBToGQLMapper,
  companyDBToGQLMapper,
  educationInfoDbToGQLMapper,
  skillDBToGQLMapper,
} from '@src/coreUtils/dataParsers/dBToGQLMappers';

export async function fetchUser({ username }): Promise<{ user: IUser }> {
  const user: IUser = await UserModel.findOne({ username });
  // console.log(JSON.stringify(user));
  return { user };
}

function accumulateClans(clans: Array<IClan>) {
  return {
    clans: map(clans, clanDBToGQLMapper),
  };
}

export function accumulateSkills(skills: { core: Array<ISkill>; familiar: Array<ISkill> }) {
  return {
    skills: {
      coreSkills: map(skills.core, skillDBToGQLMapper),
      familiarSkills: map(skills.familiar, skillDBToGQLMapper),
    },
  };
}

function accumulateWorkExperience(
  currentCompany?: ICompany,
  pastCompanies?: Array<ICompany>,
  currentDesignation?: string
) {
  return {
    workExperience: {
      currentCompany: companyDBToGQLMapper(currentCompany),
      currentDesignation,
      pastCompanies: map(pastCompanies, companyDBToGQLMapper),
    },
  };
}

function accumulateEducationDetails(iEducation: Array<IEducationInfo>) {
  const education = map(iEducation, educationInfoDbToGQLMapper);
  return {
    educationDetails: {
      education,
      latestCollegeName: education[0].name,
    },
  };
}

function accumulatePersonalDetails(gender, invitedBy, signupReason, phoneNumber) {
  return { personalDetails: { gender, invitedBy, signupReason, phoneNumber } };
}

function accumulateReferralSettings(referralSettings) {
  return {
    referralSettings: {
      isPublic: referralSettings.isPublic,
      eligibleClans: map(referralSettings.eligibleClans, clanDBToGQLMapper),
    },
  };
}

function accumulateJobPreference(jobPreferenceInfo: IJobPreferenceInfo) {
  return {
    jobPreference: jobPreferenceInfo,
  };
}

export function getProfilePicSignedUrl(profilePic) {
  return profilePic
    ? generateSignedURL(S3_Operation.GetObject, {
        Bucket: profilePic.bucketName,
        Key: profilePic.key,
      }).signedURL
    : null;
}

export function transformUserResponse({ user }: { user: IUser }): User {
  const {
    email,
    username,
    name,
    isFresher,
    role,
    yearsOfExperience,
    resume,
    profilePic,
    profileHeadline,
    gemCount,
    clans,
    skills,
    currentCompany,
    currentDesignation,
    pastCompanies,
    education,
    gender,
    invitedBy,
    signupReason,
    phoneNumber,
    referralSettings,
    jobPreferenceInfo,
    codingProfiles,
  } = user;

  return {
    email,
    username,
    name,
    isFresher,
    role,
    yearsOfExperience,
    codingProfiles,
    resumeUrl: generateSignedURL(S3_Operation.GetObject, {
      Bucket: resume.bucketName,
      Key: resume.key,
    }).signedURL,
    profilePicUrl: getProfilePicSignedUrl(profilePic),
    profileHeadline,
    ...accumulateClans(clans),
    ...accumulateSkills(skills),
    ...accumulateWorkExperience(currentCompany, pastCompanies, currentDesignation),
    ...accumulateEducationDetails(education),
    ...accumulatePersonalDetails(gender, invitedBy, signupReason, phoneNumber),
    ...accumulateReferralSettings(referralSettings),
    ...accumulateJobPreference(jobPreferenceInfo),
    // ...accumulateCodingProfiles(codingProfiles),
    gemCount,
    // Add dummy implementations
    askedReferrals: {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
      totalCount: 0,
    },
    referralRequests: {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
      totalCount: 0,
    },
  };
}
