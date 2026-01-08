import { ReferralRequestModel } from '@src/mongoDb/daoModels/referralModels/referralRequestModel';
import { ErrorCodes, GemValues } from '@src/coreConfigs/constants/enums';
import { isApplicantRequestValid } from '@src/graphql/resolvers/mutations/mutationResolvers/updateReferralState/helpers/referralStateValidators';
import { UserModel } from '@src/mongoDb/daoModels/userModel';

export const updateReferralStateByApplicant = async (
  username,
  referralRequestInfo,
  referralRequestId,
  referralUpdateState
) => {
  if (isApplicantRequestValid(referralUpdateState, referralRequestInfo.askedReferralStatus)) {
    await Promise.all([
      ReferralRequestModel.updateOne(
        { _id: referralRequestId },
        {
          askedReferralStatus: referralUpdateState,
        }
      ),
      UserModel.updateOne(
        { username: username },
        {
          $inc: { gemCount: GemValues.APPLICANT_ACKNOWLEDGE },
        }
      ),
    ]);
    //TODO: CJ-37
  } else {
    console.log('Invalid update', referralRequestInfo, referralUpdateState);
    throw new Error(ErrorCodes.INVALID_INPUT);
  }
};
