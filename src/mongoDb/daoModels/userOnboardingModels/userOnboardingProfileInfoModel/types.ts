import { Document } from 'mongoose';
import { S3Path } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';

export type ICodingProfile = {
  platformName: string;
  username: string;
  url: string; // This is the full URL
};

export enum GENDER {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

export default interface IUserOnboardingProfileInfo {
  email: string;
  profilePic?: S3Path;
  profileHeadline?: string;
  codingProfiles?: Array<ICodingProfile>;
  phoneNumber: string;
  gender: GENDER;
}
