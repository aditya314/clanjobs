import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { ReferralState } from '@src/graphql/types';

export const referralStatusGQLToMongoMapper = {
  [ReferralState.Applied]: REFERRAL_STATE.APPLIED,
  [ReferralState.InReview]: REFERRAL_STATE.IN_REVIEW,
  [ReferralState.Declined]: REFERRAL_STATE.DECLINED,
  [ReferralState.Accepted]: REFERRAL_STATE.ACCEPTED,
  [ReferralState.Acknowledged]: REFERRAL_STATE.ACKNOWLEDGED,
  [ReferralState.Expired]: REFERRAL_STATE.EXPIRED,
};

export const isApplicantRequestValid = (referralUpdateState, currentState) =>
  referralUpdateState === REFERRAL_STATE.ACKNOWLEDGED && currentState === REFERRAL_STATE.ACCEPTED;

export const isReferralRequestStatusTransitionValid = (referralUpdateState, currentState) =>
  (referralUpdateState == REFERRAL_STATE.IN_REVIEW && currentState == REFERRAL_STATE.APPLIED) ||
  (referralUpdateState == REFERRAL_STATE.DECLINED &&
    (currentState == REFERRAL_STATE.IN_REVIEW || currentState == REFERRAL_STATE.APPLIED)) ||
  (referralUpdateState == REFERRAL_STATE.ACCEPTED &&
    (currentState == REFERRAL_STATE.IN_REVIEW || currentState == REFERRAL_STATE.APPLIED));

export const isReferrerRequestValid = referralUpdateState =>
  referralUpdateState == REFERRAL_STATE.IN_REVIEW ||
  referralUpdateState == REFERRAL_STATE.DECLINED ||
  referralUpdateState == REFERRAL_STATE.ACCEPTED;

export const isRequestDeclinedByAll = referralStatusCountMap =>
  referralStatusCountMap[REFERRAL_STATE.DECLINED] > 0 &&
  referralStatusCountMap[REFERRAL_STATE.APPLIED] === 0 &&
  referralStatusCountMap[REFERRAL_STATE.IN_REVIEW] === 0;
