import mongoose, { Model, Schema } from 'mongoose';
import { S3Path } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';
import ISkill from '@src/mongoDb/daoModels/entityModels/skillModel/types';

const Skill: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  logoKeyPath: S3Path,
});

export const SkillModel: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', Skill);
