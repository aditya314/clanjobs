import ISkill from '@src/mongoDb/daoModels/entityModels/skillModel/types';

export enum ROLE {
  FRONTEND_ENGINEER = 'Frontend Engineer',
  BACKEND_ENGINEER = 'Backend Engineer',
  FULLSTACK_ENGINEER = 'Full-Stack Engineer',
  ANDROID_ENGINEER = 'Android Engineer',
  IOS_ENGINEER = 'iOS Engineer',
  TEST_ENGINEER = 'Software Engineer in Test /QA Engineer',
  DEVOPS_ENGINEER = 'DevOps Engineer',
  SECURITY_ENGINEER = 'Security Engineer',
  BIGDATA_ENGINEER = 'Big Data / DWH / ETL Engineer',
  EMBEDDED_ENGINEER = 'Embedded / Kernel Development engineer',
}

export type S3Path = {
  bucketName: string;
  key: string;
};

export default interface IUserOnboardingBasicInfo {
  email: string;
  name: string;
  username: string;
  isFresher: boolean;
  yearsOfExperience: {
    years: number;
    months: number;
  };
  role: string;
  skills: {
    core: Array<ISkill>;
    familiar: Array<ISkill>;
  };
}
