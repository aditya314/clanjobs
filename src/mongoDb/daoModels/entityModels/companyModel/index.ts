import mongoose, { Model, Schema } from 'mongoose';
import { S3Path } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';
import ICompany from '@src/mongoDb/daoModels/entityModels/companyModel/types';

const Company: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logoKeyPath: S3Path,
  clanId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const CompanyModel: Model<ICompany> =
  mongoose.models.Company || mongoose.model<ICompany>('Company', Company);
