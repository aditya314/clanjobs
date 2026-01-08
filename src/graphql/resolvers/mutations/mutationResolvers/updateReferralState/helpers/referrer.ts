import IReferralRequest, {
  IReferrerStateInfo,
  REFERRAL_STATE,
} from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { ReferralRequestModel } from '@src/mongoDb/daoModels/referralModels/referralRequestModel';
import { ErrorCodes, GemValues } from '@src/coreConfigs/constants/enums';
import {
  isReferralRequestStatusTransitionValid,
  isReferrerRequestValid,
  isRequestDeclinedByAll,
} from '@src/graphql/resolvers/mutations/mutationResolvers/updateReferralState/helpers/referralStateValidators';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import { map } from 'lodash';

const getUpdatedStatusFromMap = (referralStatusCountMap, currentState) => {
  let computedStatus = REFERRAL_STATE.APPLIED;
  if (referralStatusCountMap[REFERRAL_STATE.ACCEPTED] > 0) {
    computedStatus = REFERRAL_STATE.ACCEPTED;
  } else if (referralStatusCountMap[REFERRAL_STATE.IN_REVIEW] > 0) {
    computedStatus = REFERRAL_STATE.IN_REVIEW;
  } else if (isRequestDeclinedByAll(referralStatusCountMap)) {
    computedStatus = REFERRAL_STATE.DECLINED;
  }
  return isReferralRequestStatusTransitionValid(computedStatus, currentState)
    ? computedStatus
    : currentState;
};

const isValidForUsernameAndState = (referrer: IReferrerStateInfo, username, referralUpdateState) =>
  referrer.username === username &&
  isReferralRequestStatusTransitionValid(referralUpdateState, referrer.referralRequestStatus);

const updateReferrersListAndReferralStatusCountMap = (
  referrersList: Array<IReferrerStateInfo>,
  referralStatusCountMap: Record<REFERRAL_STATE, number>,
  username: string,
  referralUpdateState: REFERRAL_STATE
): Array<IReferrerStateInfo> => {
  return map(referrersList, (referrer: IReferrerStateInfo) => {
    if (isValidForUsernameAndState(referrer, username, referralUpdateState)) {
      referrer.referralRequestStatus = referralUpdateState;
    }
    referralStatusCountMap[referrer.referralRequestStatus]++;
    return referrer;
  });
};

const getUpdatedReferrersListWithUpdatedStatus = (
  username: string,
  referralUpdateState: REFERRAL_STATE,
  referrersList: Array<IReferrerStateInfo>,
  currentState: REFERRAL_STATE
): { updatedReferrerList: Array<IReferrerStateInfo>; updatedApplicationStatus: REFERRAL_STATE } => {
  let referralStatusCountMap = {
    [REFERRAL_STATE.APPLIED]: 0,
    [REFERRAL_STATE.IN_REVIEW]: 0,
    [REFERRAL_STATE.DECLINED]: 0,
    [REFERRAL_STATE.ACKNOWLEDGED]: 0,
    [REFERRAL_STATE.EXPIRED]: 0,
    [REFERRAL_STATE.ACCEPTED]: 0,
  };
  let updatedReferrersList = updateReferrersListAndReferralStatusCountMap(
    referrersList,
    referralStatusCountMap,
    username,
    referralUpdateState
  );
  let updatedStatus = getUpdatedStatusFromMap(referralStatusCountMap, currentState);
  return { updatedReferrerList: updatedReferrersList, updatedApplicationStatus: updatedStatus };
};

export const updateReferralStateByReferrer = async (
  username: string,
  referralRequest: IReferralRequest,
  referralRequestId: string,
  referralUpdateState: REFERRAL_STATE
) => {
  if (isReferrerRequestValid(referralUpdateState)) {
    const { updatedReferrerList, updatedApplicationStatus } =
      getUpdatedReferrersListWithUpdatedStatus(
        username,
        referralUpdateState,
        referralRequest.referrersList,
        referralRequest.askedReferralStatus
      );
    await Promise.all([
      ReferralRequestModel.updateOne(
        { _id: referralRequestId },
        {
          askedReferralStatus: updatedApplicationStatus,
          referrersList: updatedReferrerList,
        }
      ),
      UserModel.updateOne(
        { username: username },
        {
          $inc: { gemCount: GemValues.REFERRAL_STATE_CHANGE },
        }
      ),
    ]);
  } else {
    console.log('Invalid update', username, referralRequest, referralUpdateState);
    throw new Error(ErrorCodes.INVALID_INPUT);
  }
};
