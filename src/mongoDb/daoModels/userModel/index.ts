import mongoose, { Model, Schema } from 'mongoose';
import IUser from '@src/mongoDb/daoModels/userModel/types';
import {
  S3Path,
  SkillList,
} from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';
import {
  EducationInfo,
  Company,
} from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel';
import { CodingProfile } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel';

const JobPreferenceInfo = {
  preferredRole: {
    type: String,
    required: true,
  },
  preferredLocations: [
    {
      type: String,
      required: true,
    },
  ],
  preferredCTC: {
    type: Number,
    required: true,
  },
  noticePeriod: {
    type: Number,
    required: true,
  },
};

const Clan = {
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  logoKeyPath: {
    type: S3Path,
    required: false,
  },
  sourceId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  clanType: {
    type: String,
    required: true,
  },
};

const User: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  isFresher: {
    type: Boolean,
    required: true,
  },
  yearsOfExperience: {
    years: {
      type: String,
      required: true,
    },
    months: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    required: true,
  },
  skills: {
    core: SkillList,
    familiar: SkillList,
  },
  currentDesignation: {
    type: String,
    required: false,
  },
  currentCompany: {
    type: Company,
    required: false,
  },
  pastCompanies: [Company],
  education: {
    type: [EducationInfo],
    // https://stackoverflow.com/questions/36860342/mongoose-make-array-required
    validate: v => Array.isArray(v) && v.length > 0,
  },
  clans: {
    type: [Clan],
    required: true,
  },
  resume: S3Path,
  profilePic: {
    type: S3Path,
    required: false,
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
  jobPreferenceInfo: JobPreferenceInfo,
  referralSettings: {
    isPublic: {
      type: Boolean,
      required: true,
    },
    eligibleClans: {
      type: [Clan],
      required: true,
    },
  },
  signupReason: {
    type: String,
    required: false,
  },
  invitedBy: {
    type: String, // invitedBy is a username who referred name (It's validated from frontend)
    required: false,
  },
  gemCount: {
    type: Number,
    required: true,
  },
});

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', User);
