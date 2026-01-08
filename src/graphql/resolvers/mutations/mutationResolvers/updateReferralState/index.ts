import {
  MutationUpdateReferralStateArgs,
  Resolver,
  ResolversTypes,
  UpdateReferralPayload,
  UserType,
} from '@src/graphql/types';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';
import { ReferralRequestModel } from '@src/mongoDb/daoModels/referralModels/referralRequestModel';
import { updateReferralStateByApplicant } from '@src/graphql/resolvers/mutations/mutationResolvers/updateReferralState/helpers/applicant';
import { updateReferralStateByReferrer } from '@src/graphql/resolvers/mutations/mutationResolvers/updateReferralState/helpers/referrer';
import { checkIfArrayHasValidObjectIDs } from '@src/graphql/resolvers/commonUtils/validators';
import { map } from 'lodash';
import { referralStatusGQLToMongoMapper } from '@src/graphql/resolvers/mutations/mutationResolvers/updateReferralState/helpers/referralStateValidators';
import { ResolverParentTypes } from '@graphql-codegen/visitor-plugin-common';
import { Context } from '@src/graphql/context';

const isApplicantPresentInReferralRequest = (referralRequestInfo, username) =>
  referralRequestInfo.applicantInfo.username === username;

const isReferrerPresentInReferralRequest = (referralRequestInfo, username) =>
  map(referralRequestInfo.referrersList, 'username').indexOf(username) >= 0;

const validateRequestId = referralRequestId => {
  if (!checkIfArrayHasValidObjectIDs([referralRequestId])) {
    console.log('Request id is invalid', referralRequestId);
    throw new Error(ErrorCodes.INVALID_INPUT);
  }
};

const isRequestNotChangingCurrentState = (referralRequestInfo, referralState) =>
  referralRequestInfo.askedReferralStatus === referralStatusGQLToMongoMapper[referralState];

const updateReferralStateResolver: Resolver<
  ResolversTypes['UpdateReferralPayload'],
  ResolverParentTypes['Mutation'],
  Context,
  MutationUpdateReferralStateArgs
> = async (_: any, { input }, { session }): Promise<UpdateReferralPayload> => {
  if (!session) {
    throw new Error(ErrorCodes.NOT_AUTHORIZED);
  }
  try {
    const { username, userType, referralState, referralRequestId } = input;
    validateRequestId(referralRequestId);

    let referralRequest = await ReferralRequestModel.findOne({ _id: referralRequestId });

    if (isRequestNotChangingCurrentState(referralRequest, referralState)) return input;

    if (userType === UserType.Applicant) {
      if (isApplicantPresentInReferralRequest(referralRequest, username)) {
        await updateReferralStateByApplicant(
          username,
          referralRequest,
          referralRequestId,
          referralStatusGQLToMongoMapper[referralState]
        );
      } else {
        console.log('Applicant not present in request', username, referralRequest);
        throw new Error(ErrorCodes.INVALID_INPUT);
      }
    } else if (userType === UserType.Referrer) {
      if (isReferrerPresentInReferralRequest(referralRequest, username)) {
        await updateReferralStateByReferrer(
          username,
          referralRequest,
          referralRequestId,
          referralStatusGQLToMongoMapper[referralState]
        );
      } else {
        console.log('Referrer not present in request', username, referralRequest);
        throw new Error(ErrorCodes.INVALID_INPUT);
      }
    } else {
      console.log('User type is invalid', userType);
      throw new Error(ErrorCodes.INVALID_INPUT);
    }
  } catch (e) {
    console.log(e);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
  return input;
};

export default updateReferralStateResolver;
