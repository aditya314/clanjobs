import mongoose, { Model, Schema } from 'mongoose';
import IUserOnboardingAuth from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';

const UserOnboardingAuth: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
  lastCompletedState: {
    type: String,
    required: true,
  },
});

export const UserOnboardingAuthModel: Model<IUserOnboardingAuth> =
  mongoose.models.UserOnboardingAuth ||
  mongoose.model<IUserOnboardingAuth>('UserOnboardingAuth', UserOnboardingAuth);
