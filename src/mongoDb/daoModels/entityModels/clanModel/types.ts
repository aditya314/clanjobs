import { S3Path } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';

export enum CLAN_TYPE {
  COLLEGE = 'COLLEGE',
  COMPANY = 'COMPANY',
}

export default interface IClan {
  _id: string; // decide if this key is same as org key
  name: string;
  sourceId: string; // in, case we use sourceId to get company/college info
  logoKeyPath?: S3Path;
  clanType: CLAN_TYPE;
}
