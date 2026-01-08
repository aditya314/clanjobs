import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';

function getApplicantReferralMenu(referralState: REFERRAL_STATE) {
  switch (referralState) {
    case REFERRAL_STATE.APPLIED:
      return [REFERRAL_STATE.APPLIED, REFERRAL_STATE.ACKNOWLEDGED];
    case REFERRAL_STATE.ACKNOWLEDGED:
      return [];
    default:
      return [];
  }
}

function getReferrerReferralMenu(referralState) {
  switch (referralState) {
    case REFERRAL_STATE.APPLIED:
      return [REFERRAL_STATE.IN_REVIEW, REFERRAL_STATE.ACCEPTED, REFERRAL_STATE.DECLINED];
    case REFERRAL_STATE.IN_REVIEW:
      return [REFERRAL_STATE.ACCEPTED, REFERRAL_STATE.DECLINED];
    case REFERRAL_STATE.ACCEPTED:
      return [];
    case REFERRAL_STATE.DECLINED:
      return [];
    default:
      return [];
  }
}

export function getReferralMenu(isApplicant: boolean, referralState): Array<REFERRAL_STATE> {
  return isApplicant
    ? getApplicantReferralMenu(referralState)
    : getReferrerReferralMenu(referralState);
}
