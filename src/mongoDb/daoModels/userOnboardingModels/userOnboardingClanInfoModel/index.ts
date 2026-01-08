import mongoose, { Model, Schema } from 'mongoose';
import IUserOnboardingClanInfo from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel/types';
import { S3Path } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';

export const Company = {
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  logoKeyPath: S3Path,
  clanId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
};

export const EducationInfo = {
  _id: {
    required: false,
  },
  collegeId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  yearOfGraduation: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  logoKeyPath: {
    type: S3Path,
    required: false,
  },
  clanId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
};

const UserOnboardingClanInfo: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  currentDesignation: {
    type: String,
    required: false,
  },
  currentCompany: {
    type: Company,
    required: false,
  },
  pastCompanies: {
    type: [Company],
    required: false,
  },
  education: {
    type: [EducationInfo],
    // https://stackoverflow.com/questions/36860342/mongoose-make-array-required
    validate: v => Array.isArray(v) && v.length > 0,
  },
  resume: S3Path,
});

export const UserOnboardingClanInfoModel: Model<IUserOnboardingClanInfo> =
  mongoose.models.UserOnboardingClanInfo ||
  mongoose.model<IUserOnboardingClanInfo>('UserOnboardingClanInfo', UserOnboardingClanInfo);
