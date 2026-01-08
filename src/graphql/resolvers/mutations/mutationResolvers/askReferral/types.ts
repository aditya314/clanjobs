import IUser from '@src/mongoDb/daoModels/userModel/types';
import IReferralRequest from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';

export type QueryToFetchEligibleReferrersPayload = {
  applicantClanIds: Array<string>; // At least 1 Clan should be present
  companyId: string;
};

export type FetchEligibleReferrersPayload = {
  eligibleReferrers: Array<IUser>;
};

export type UpsertReferralRequestPayload = {
  referralRequest: IReferralRequest;
};
