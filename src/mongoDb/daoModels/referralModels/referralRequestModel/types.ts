import { S3Path } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';
import ICompany from '@src/mongoDb/daoModels/entityModels/companyModel/types';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';

export enum NETWORK_TYPE {
  PUBLIC = 'PUBLIC',
  PERSONAL = 'PERSONAL',
  CLAN = 'CLAN',
}

export enum REFERRAL_STATE {
  APPLIED = 'APPLIED',
  IN_REVIEW = 'IN REVIEW',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  EXPIRED = 'EXPIRED',
}

export type IReferrerStateInfo = {
  username: string;
  networkType: NETWORK_TYPE;
  referralRequestStatus: REFERRAL_STATE;
};

export type IApplicantInfo = {
  username: string;
  name: string;
  profilePic?: S3Path;
  currentDesignation?: string;
  companyName?: string; // optional for student
  latestCollegeName: string;
  resume: S3Path;
  yearsOfExperience: {
    years: number;
    months: number;
  };
  clans: Array<IClan>;
};

export type IJobInfo = {
  _id: string;
  linkedinJobId: string;
  jobRole: string;
  jobUrl: string;
  company: ICompany;
  jobLocation: string;
};

export default interface IReferralRequest {
  _id?: string;
  applicantInfo: IApplicantInfo;
  jobInfo: IJobInfo;
  askedReferralStatus: REFERRAL_STATE;
  referrersList: Array<IReferrerStateInfo>;
  appliedOn: number;
}
