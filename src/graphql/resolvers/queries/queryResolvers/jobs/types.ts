import { JobFilter } from '@src/graphql/types';
import IJob from '@src/mongoDb/daoModels/jobModel/types';
import IUser from '@src/mongoDb/daoModels/userModel/types';

export type QueryForFetchingJobsPagePayload = {
  first: number;
  after: string;
  filters: JobFilter;
  applicantUserData: IUser;
};
export type JobsFetchPagePayload = {
  aggregatedQuery: Array<object>;
  first: number;
  applicantUserData: IUser;
};
export type AccumulateJobsPageMetaPayload = {
  items: Array<IJob>;
  first: number;
  totalCount: number;
  applicantUserData: IUser;
};
