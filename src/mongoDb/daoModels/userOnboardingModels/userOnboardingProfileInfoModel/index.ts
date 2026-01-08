import mongoose, { Schema, Model } from 'mongoose';
import IUserOnboardingProfileInfo from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel/types';
import { S3Path } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';

export const CodingProfile = {
  platformName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
};

const UserOnboardingProfileInfo: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: S3Path,
    required: false, // Frontend makes sure that this path has valid image inside it
  },
  profileHeadline: {
    type: String,
    required: false,
  },
  codingProfiles: {
    type: [CodingProfile],
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

export const UserOnboardingProfileInfoModel: Model<IUserOnboardingProfileInfo> =
  mongoose.models.UserOnboardingProfileInfo ||
  mongoose.model<IUserOnboardingProfileInfo>(
    'UserOnboardingProfileInfo',
    UserOnboardingProfileInfo
  );
