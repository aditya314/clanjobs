import { Document } from 'mongoose';
import { S3Path } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';

export default interface ISkill {
  _id: string;
  name: string;
  logoKeyPath: S3Path;
}
