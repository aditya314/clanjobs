import IUser from '@src/mongoDb/daoModels/userModel/types';
import { isNil, map, union, unionBy } from 'lodash';
import {
  FetchEligibleReferrersPayload,
  QueryToFetchEligibleReferrersPayload,
  UpsertReferralRequestPayload,
} from '@src/graphql/resolvers/mutations/mutationResolvers/askReferral/types';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import IReferralRequest, {
  IReferrerStateInfo,
  NETWORK_TYPE,
  REFERRAL_STATE,
} from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { DecrementGemsPayload } from '@src/graphql/resolvers/commonUtils/gamificationsUtils/types';
import { ReferralRequestModel } from '@src/mongoDb/daoModels/referralModels/referralRequestModel';
import { GamificationEvent } from '@src/coreConfigs/constants/enums';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';
import { ObjectID } from 'bson';
import mongoose from 'mongoose';

export function getLatestCollegeName(user: IUser): string | undefined {
  return user.education.length ? user.education[0].name : undefined;
}

export function getClansIds(clans: Array<IClan>): Array<string> {
  return map(clans, (clan: IClan) => clan._id);
}

function getNetworkGivenReferrer(referrer: IUser): NETWORK_TYPE {
  if (referrer.referralSettings.isPublic) return NETWORK_TYPE.PUBLIC;
  return NETWORK_TYPE.CLAN;
}

export function getQueryToFetchEligibleReferrers({
  applicantClanIds,
  companyId,
}: QueryToFetchEligibleReferrersPayload): object {
  const query = {
    $and: [
      { 'currentCompany._id': { $eq: new ObjectID(companyId) } },
      {
        $or: [
          { 'referralSettings.isPublic': { $eq: true } },
          { 'referralSettings.eligibleClans._id': { $in: applicantClanIds } },
        ],
      },
    ],
  };
  return {
    query,
  };
}

export async function fetchSampledEligibleReferrers({
  query,
}): Promise<FetchEligibleReferrersPayload> {
  const eligibleReferrers = await UserModel.aggregate([
    { $match: query },
    { $sample: { size: 15 } },
  ]);
  return {
    eligibleReferrers,
  };
}

export function accumulateReferrerInfo({
  eligibleReferrers,
}: FetchEligibleReferrersPayload): Array<IReferrerStateInfo> {
  return map<IUser, IReferrerStateInfo>(eligibleReferrers, referrer => ({
    username: referrer.username,
    networkType: getNetworkGivenReferrer(referrer),
    referralRequestStatus: REFERRAL_STATE.APPLIED,
  }));
}

export async function upsertReferralRequest({
  referralRequest,
}: UpsertReferralRequestPayload): Promise<DecrementGemsPayload> {
  const response: IReferralRequest = await ReferralRequestModel.findOne({
    $and: [
      {
        'applicantInfo.username': {
          $eq: referralRequest.applicantInfo.username,
        },
      },
      {
        'jobInfo._id': {
          $eq: new ObjectID(referralRequest.jobInfo._id),
        },
      },
    ],
  });

  if (isNil(response)) {
    await ReferralRequestModel.create({ _id: new mongoose.Types.ObjectId(), ...referralRequest });
  } else {
    await ReferralRequestModel.updateOne(
      {
        _id: response._id,
      },
      {
        $set: {
          referrersList: unionBy(response.referrersList, referralRequest.referrersList, 'username'),
        },
      }
    );
  }
  return {
    username: referralRequest.applicantInfo.username,
    operation: GamificationEvent.ASK_REFERRAL,
  };
}
