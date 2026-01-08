import mongoose, { Model, Schema } from 'mongoose';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';
import { S3Path } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';

export const Clan: Schema = new Schema({
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
});

export const ClanModel: Model<IClan> = mongoose.models.Clan || mongoose.model<IClan>('Clan', Clan);
