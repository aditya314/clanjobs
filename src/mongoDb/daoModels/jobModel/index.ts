import mongoose, { Model, Schema } from 'mongoose';
import { Company } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel';
import IJob from '@src/mongoDb/daoModels/jobModel/types';

// id refers to to jobId from linkedIn schema
const Job: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  linkedinJobId: {
    type: String,
    required: true,
    unique: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  company: Company,
  jobLocation: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Number,
    required: true,
  },
  linkedInUrl: {
    type: String,
    required: true,
  },
  jobUrl: {
    type: String,
    required: true,
  },
  seniority: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
});

export const JobModel: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', Job);
