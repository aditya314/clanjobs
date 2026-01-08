import { DEGREE } from '@components/onboarding/clanInfoForm/clanInfoFromFields/educationListGenerator/educationField/degreeField';
import { SPECIALIZATION } from '@components/onboarding/clanInfoForm/clanInfoFromFields/educationListGenerator/educationField/specialisationField';
import { S3Path } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';
import ICompany from '@src/mongoDb/daoModels/entityModels/companyModel/types';

export type IEducationInfo = {
  collegeId: string;
  name: string;
  yearOfGraduation: number;
  degree: DEGREE;
  specialization: SPECIALIZATION;
  logoKeyPath?: S3Path;
  clanId: string;
};

export default interface IUserOnboardingClanInfo {
  email: string;
  currentDesignation?: string;
  currentCompany?: ICompany; // Optional since fresher's don't have any companies
  pastCompanies: Array<ICompany>;
  education: Array<IEducationInfo>;
  resume: S3Path;
}
