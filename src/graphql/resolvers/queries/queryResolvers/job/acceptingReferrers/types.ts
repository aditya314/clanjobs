import IUser from '@src/mongoDb/daoModels/userModel/types';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';

export type QueryToFetchAllEligibleReferrersPayload = {
  applicantClans: Array<IClan>; // At least 1 Clan should be present
  companyId: string;
};

export type FetchAllEligibleReferrersPayload = {
  eligibleReferrers: Array<IUser>;
  applicantClans: Array<IClan>; // At least 1 Clan should be present
};
