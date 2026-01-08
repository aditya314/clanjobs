import mongoose, { Schema, Model } from 'mongoose';
import IUserOnboardingBasicInfo from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';

export const S3Path = {
  bucketName: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
};

const Skill = {
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  logoKeyPath: S3Path,
};

export const SkillList = {
  type: [Skill],
  // https://stackoverflow.com/questions/36860342/mongoose-make-array-required
  validate: v => Array.isArray(v) && v.length > 0,
};

const UserOnboardingBasicInfo: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  isFresher: {
    type: Boolean,
    required: true,
  },
  yearsOfExperience: {
    years: { type: Number, required: true },
    months: { type: Number, required: true },
  },
  role: {
    type: String,
    required: true,
  },
  skills: {
    core: SkillList,
    familiar: SkillList,
  },
});

export const UserOnboardingBasicInfoModel: Model<IUserOnboardingBasicInfo> =
  mongoose.models.UserOnboardingBasicInfo ||
  mongoose.model<IUserOnboardingBasicInfo>('UserOnboardingBasicInfo', UserOnboardingBasicInfo);
