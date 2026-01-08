import ICompany from '@src/mongoDb/daoModels/entityModels/companyModel/types';
import {
  Clan,
  ClanType,
  Company,
  EducationInfo,
  Gender,
  NetworkType,
  OnboardingState,
  ReferralState,
  S3_Operation,
  Seniority,
  Skill,
} from '@src/graphql/types';
import { generateSignedURL } from '@src/coreUtils/s3Utils';
import ISkill from '@src/mongoDb/daoModels/entityModels/skillModel/types';
import IClan, { CLAN_TYPE } from '@src/mongoDb/daoModels/entityModels/clanModel/types';
import { IEducationInfo } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel/types';
import {
  NETWORK_TYPE,
  REFERRAL_STATE,
} from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { SENIORITY } from '@src/mongoDb/daoModels/jobModel/types';
import { ONBOARDING_STATE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';
import { GENDER } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel/types';
import { isNil } from 'lodash';
import { SPECIALIZATION } from '@components/onboarding/clanInfoForm/clanInfoFromFields/educationListGenerator/educationField/specialisationField';
import { DEGREE } from '@components/onboarding/clanInfoForm/clanInfoFromFields/educationListGenerator/educationField/degreeField';

export const CLAN_TYPE_DB_TO_GQL_MAPPER = {
  [CLAN_TYPE.COMPANY]: ClanType.Company,
  [CLAN_TYPE.COLLEGE]: ClanType.College,
};
export const REFERRAL_STATE_DB_TO_GQL_MAPPER = {
  [REFERRAL_STATE.APPLIED]: ReferralState.Applied,
  [REFERRAL_STATE.IN_REVIEW]: ReferralState.InReview,
  [REFERRAL_STATE.ACCEPTED]: ReferralState.Accepted,
  [REFERRAL_STATE.DECLINED]: ReferralState.Declined,
  [REFERRAL_STATE.ACKNOWLEDGED]: ReferralState.Acknowledged,
  [REFERRAL_STATE.EXPIRED]: ReferralState.Expired,
};
export const NETWORK_TYPE_DB_TO_GQL_MAPPER = {
  [NETWORK_TYPE.PUBLIC]: NetworkType.Public,
  [NETWORK_TYPE.PERSONAL]: NetworkType.Personal,
  [NETWORK_TYPE.CLAN]: NetworkType.Clan,
};

export const SENIORITY_TYPE_DB_TO_GQL_MAPPER = {
  [SENIORITY.INTERNSHIP]: Seniority.Internship,
  [SENIORITY.ENTRY_LEVEL]: Seniority.EntryLevel,
  [SENIORITY.MID_SENIOR]: Seniority.MidSenior,
  [SENIORITY.ASSOCIATE]: Seniority.Associate,
  [SENIORITY.DIRECTOR]: Seniority.Director,
  [SENIORITY.EXECUTIVE]: Seniority.Executive,
};
export const GENDER_DB_TO_GQL_MAPPER = {
  [GENDER.MALE]: Gender.Male,
  [GENDER.FEMALE]: Gender.Female,
};

export const LAST_COMPLETED_STATE_DB_TO_GQL_MAPPER = {
  [ONBOARDING_STATE.BASIC_INFO]: OnboardingState.BasicInfo,
  [ONBOARDING_STATE.CLAN_INFO]: OnboardingState.ClanInfo,
  [ONBOARDING_STATE.PROFILE_INFO]: OnboardingState.ProfileInfo,
  [ONBOARDING_STATE.JOB_PREFERENCE]: OnboardingState.JobPreference,
};

export const companyDBToGQLMapper = (company: ICompany): Company => {
  if (isNil(company)) return null;
  return {
    id: company._id.toString(),
    name: company.name,
    logoUrl: generateSignedURL(S3_Operation.GetObject, {
      Bucket: company.logoKeyPath.bucketName,
      Key: company.logoKeyPath.key,
    }).signedURL,
    clanId: company.clanId,
  };
};

export const skillDBToGQLMapper = (skill: ISkill): Skill => ({
  id: skill._id.toString(),
  name: skill.name,
  logoUrl: generateSignedURL(S3_Operation.GetObject, {
    Bucket: skill.logoKeyPath.bucketName,
    Key: skill.logoKeyPath.key,
  }).signedURL,
});

export const clanDBToGQLMapper = (clan: IClan): Clan => ({
  id: clan._id,
  name: clan.name,
  logoUrl:
    clan.clanType === CLAN_TYPE.COMPANY
      ? generateSignedURL(S3_Operation.GetObject, {
          Bucket: clan.logoKeyPath.bucketName,
          Key: clan.logoKeyPath.key,
        }).signedURL
      : null,
  sourceId: clan.sourceId,
  clanType: CLAN_TYPE_DB_TO_GQL_MAPPER[clan.clanType],
});

// export const specializationDbToGQLMapper = (specialization: SPECIALIZATION) => {};
export const educationInfoDbToGQLMapper = (educationInfo: IEducationInfo): EducationInfo => ({
  id: educationInfo.collegeId.toString(),
  clanId: educationInfo.clanId,
  specialization: SPECIALIZATION[educationInfo.specialization],
  degree: DEGREE[educationInfo.degree],
  name: educationInfo.name,
  yearOfGraduation: educationInfo.yearOfGraduation,
});
