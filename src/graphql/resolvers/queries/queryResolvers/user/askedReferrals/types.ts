import { AskedReferralFilter, JobFilter } from '@src/graphql/types';
import IJob from '@src/mongoDb/daoModels/jobModel/types';
import IReferralRequest from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';

export type QueryForFetchingAskedReferralsPagePayload = {
  username: string;
  first: number;
  after: string;
  filters: AskedReferralFilter;
};
export type AskedReferralsFetchPagePayload = {
  aggregatedQuery: Array<object>;
  first: number;
};
export type AccumulateAskedReferralsPageMetaPayload = {
  items: Array<IReferralRequest>;
  first: number;
  totalCount: number;
};
