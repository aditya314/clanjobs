import ICompany from '@src/mongoDb/daoModels/entityModels/companyModel/types';

export enum SENIORITY {
  INTERNSHIP = 'Internship',
  ENTRY_LEVEL = 'Entry level',
  ASSOCIATE = 'Associate',
  MID_SENIOR = 'Mid-Senior level',
  DIRECTOR = 'Director',
  EXECUTIVE = 'Executive',
}

export default interface IJob {
  _id: string;
  linkedinJobId: string;
  jobRole: string;
  company: ICompany;
  jobLocation: string;
  postedDate: number;
  linkedInUrl: string;
  jobUrl: string;
  seniority: SENIORITY;
  industry: string;
}
