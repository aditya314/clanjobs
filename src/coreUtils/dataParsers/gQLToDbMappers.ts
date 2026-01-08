import { SENIORITY } from '@src/mongoDb/daoModels/jobModel/types';
import { Gender, Seniority } from '@src/graphql/types';
import { GENDER } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel/types';

export const SENIORITY_TYPE_GQL_TO_DB_MAPPER = {
  [Seniority.Internship]: SENIORITY.INTERNSHIP,
  [Seniority.EntryLevel]: SENIORITY.ENTRY_LEVEL,
  [Seniority.MidSenior]: SENIORITY.MID_SENIOR,
  [Seniority.Associate]: SENIORITY.ASSOCIATE,
  [Seniority.Director]: SENIORITY.DIRECTOR,
  [Seniority.Executive]: SENIORITY.EXECUTIVE,
};
export const GENDER_GQL_TO_DB_MAPPER = {
  [Gender.Male]: GENDER.MALE,
  [Gender.Female]: GENDER.FEMALE,
};
