import mongoose, { Model, Schema } from 'mongoose';
import IUserOnboardingJobPreference from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingJobPreferenceModel/types';

const UserOnboardingJobPreference: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  preferredRole: {
    type: String,
    required: true,
  },
  preferredLocations: [
    {
      type: String, // Location can be moved to DB when scale increases
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
  signupReason: {
    type: String,
    required: false,
  },
  invitedBy: {
    type: String, // invitedBy is a username who referred name (It's validated from frontend)
    required: false,
  },
});

export const UserOnboardingJobPreferenceModel: Model<IUserOnboardingJobPreference> =
  mongoose.models.UserOnboardingJobPreference ||
  mongoose.model<IUserOnboardingJobPreference>(
    'UserOnboardingJobPreference',
    UserOnboardingJobPreference
  );
