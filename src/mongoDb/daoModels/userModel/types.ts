import {
  ROLE,
  S3Path,
} from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';
import { IEducationInfo } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel/types';
import {
  ICodingProfile,
  GENDER,
} from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel/types';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';
import ISkill from '@src/mongoDb/daoModels/entityModels/skillModel/types';
import ICompany from '@src/mongoDb/daoModels/entityModels/companyModel/types';

export type IJobPreferenceInfo = {
  preferredRole: ROLE;
  preferredLocations: Array<string>;
  preferredCTC: number;
  noticePeriod: number;
};

export default interface IUser {
  email: string;
  name: string;
  username: string;
  isFresher: boolean;
  yearsOfExperience: {
    years: number;
    months: number;
  };
  role: ROLE;
  skills: {
    core: Array<ISkill>;
    familiar: Array<ISkill>;
  };
  clans: Array<IClan>;
  currentDesignation?: string;
  currentCompany?: ICompany;
  pastCompanies: Array<ICompany>;
  education: Array<IEducationInfo>;
  profilePic?: S3Path;
  profileHeadline?: string;
  codingProfiles: Array<ICodingProfile>;
  phoneNumber: string;
  gender: GENDER;
  resume: S3Path;
  jobPreferenceInfo: IJobPreferenceInfo;
  referralSettings: {
    isPublic: boolean;
    eligibleClans: Array<IClan>;
  };
  signupReason?: string;
  invitedBy?: string;
  gemCount: number;
}
