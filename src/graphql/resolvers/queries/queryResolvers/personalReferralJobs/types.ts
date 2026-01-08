import { PersonalReferralJobFilter } from '@src/graphql/types';
import IJob from '@src/mongoDb/daoModels/jobModel/types';
import IUser from '@src/mongoDb/daoModels/userModel/types';

export type QueryForFetchingPersonalReferralJobsPagePayload = {
  referrerUserData: IUser;
  first: number;
  after: string;
  filters: PersonalReferralJobFilter;
};
export type PersonalReferralJobsFetchPagePayload = {
  referrerUserData: IUser;
  aggregatedQuery: Array<object>;
  first: number;
};
export type AccumulatePersonalReferralJobsPageMetaPayload = {
  referrerUserData: IUser;
  items: Array<IJob>;
  first: number;
  totalCount: number;
};
