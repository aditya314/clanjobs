import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';

export const EMPTY_STRING = '';
export const JOB_PAGINATION_SIZE = 30;
export const ASKED_REFERRALS_PAGINATION_SIZE = 12;
export const REFERRALS_REQUESTS_PAGINATION_SIZE = 12;

export const REFERRAL_STATE_COLOR_MAP = {
  [REFERRAL_STATE.APPLIED]: 'blue',
  [REFERRAL_STATE.IN_REVIEW]: 'yellow',
  [REFERRAL_STATE.ACCEPTED]: 'green',
  [REFERRAL_STATE.DECLINED]: 'red',
  [REFERRAL_STATE.ACKNOWLEDGED]: 'pink',
  [REFERRAL_STATE.EXPIRED]: 'gray',
};
