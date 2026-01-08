import {
  IReferrerStateInfo,
  REFERRAL_STATE,
} from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { AskedReferralStat, ReferralState } from '@src/graphql/types';
import { compact, map, reduce } from 'lodash';
import { REFERRAL_STATE_DB_TO_GQL_MAPPER } from '@src/coreUtils/dataParsers/dBToGQLMappers';

export const accumulateAskedReferralStats = (
  referrersList: Array<IReferrerStateInfo>
): Array<AskedReferralStat> => {
  return map(Object.values(REFERRAL_STATE), (referralState): AskedReferralStat => {
    return {
      referralState: REFERRAL_STATE_DB_TO_GQL_MAPPER[referralState],
      referrerCount: reduce(
        referrersList,
        (acc, referrer) => (referrer.referralRequestStatus === referralState ? acc + 1 : acc),
        0
      ),
    };
  });
};

export function accumulateAcceptedReferrers(
  referrersList: Array<IReferrerStateInfo>
): Array<string> {
  return compact(
    map(
      referrersList,
      referrer => referrer.referralRequestStatus === REFERRAL_STATE.ACCEPTED && referrer.username
    )
  );
}
