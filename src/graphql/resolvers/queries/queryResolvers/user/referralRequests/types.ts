import { ReferralRequestFilter } from '@src/graphql/types';
import IReferralRequest from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';

export type QueryForFetchingReferralRequestsPagePayload = {
  username: string;
  first: number;
  after: string;
  filters: ReferralRequestFilter;
};
export type ReferralRequestsFetchPagePayload = {
  username: string;
  aggregatedQuery: Array<object>;
  first: number;
};
export type AccumulateReferralRequestsPageMetaPayload = {
  username: string;
  items: Array<IReferralRequest>;
  first: number;
  totalCount: number;
};
