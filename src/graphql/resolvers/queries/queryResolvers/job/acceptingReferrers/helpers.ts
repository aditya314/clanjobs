import { ObjectID } from 'bson';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import {
  FetchAllEligibleReferrersPayload,
  QueryToFetchAllEligibleReferrersPayload,
} from '@src/graphql/resolvers/queries/queryResolvers/job/acceptingReferrers/types';
import { filter, findIndex, map } from 'lodash';
import IUser from '@src/mongoDb/daoModels/userModel/types';
import {
  AcceptingReferrers,
  AcceptingReferrersClanWise,
  AcceptingReferrersPublic,
} from '@src/graphql/types';
import { transformUserResponse } from '@src/graphql/resolvers/queries/queryResolvers/user/helpers';
import { getClansIds } from '@src/graphql/resolvers/mutations/mutationResolvers/askReferral/helpers';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';
import { clanDBToGQLMapper } from '@src/coreUtils/dataParsers/dBToGQLMappers';

export function getQueryToFetchAllEligibleReferrers({
  applicantClans,
  companyId,
}: QueryToFetchAllEligibleReferrersPayload) {
  const applicantClanIds = getClansIds(applicantClans);
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
    applicantClans,
  };
}

export async function fetchAllEligibleReferrers({
  query,
  applicantClans,
}): Promise<FetchAllEligibleReferrersPayload> {
  const eligibleReferrers = await UserModel.aggregate([{ $match: query }]);
  return {
    eligibleReferrers,
    applicantClans,
  };
}

function accumulateAcceptingReferrersPublic(eligibleReferrers): AcceptingReferrersPublic {
  const acceptingReferrersPublic: Array<IUser> = filter(
    eligibleReferrers,
    (referrer: IUser) => referrer.referralSettings.isPublic
  );
  return {
    users: map(acceptingReferrersPublic, (referrer: IUser) =>
      transformUserResponse({ user: referrer })
    ),
    userCount: acceptingReferrersPublic.length,
  };
}

function accumulateAcceptingReferrerGivenClan(
  clan: IClan,
  eligibleReferrers: Array<IUser>
): AcceptingReferrersClanWise {
  const acceptingReferrersGivenClanId: Array<IUser> = filter(
    eligibleReferrers,
    (referrer: IUser) => findIndex(referrer.referralSettings.eligibleClans, ['_id', clan._id]) != -1
  );
  return {
    clanInfo: clanDBToGQLMapper(clan),
    users: map(acceptingReferrersGivenClanId, (referrer: IUser) =>
      transformUserResponse({ user: referrer })
    ),
    userCount: acceptingReferrersGivenClanId.length,
  };
}

function accumulateAcceptingReferrersClanWise(
  eligibleReferrers,
  applicantClans
): Array<AcceptingReferrersClanWise> {
  return map(applicantClans, clan => accumulateAcceptingReferrerGivenClan(clan, eligibleReferrers));
}

export function accumulateAllReferrerInfo({
  eligibleReferrers,
  applicantClans,
}: FetchAllEligibleReferrersPayload): AcceptingReferrers {
  return {
    acceptingReferrersClanWise: accumulateAcceptingReferrersClanWise(
      eligibleReferrers,
      applicantClans
    ),
    acceptingReferrersPublic: accumulateAcceptingReferrersPublic(eligibleReferrers),
  };
}
