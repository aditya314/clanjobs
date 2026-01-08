import {
  PersonalReferralJob,
  PersonalReferralJobHasAlreadyPersonallyRequestedArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '@src/graphql/types';
import { Context } from '@src/graphql/context';
import { ReferralRequestModel } from '@src/mongoDb/daoModels/referralModels/referralRequestModel';
import IReferralRequest from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { isNil } from 'lodash';

const hasAlreadyPersonallyRequestedResolver: Resolver<
  ResolversTypes['Boolean'],
  Partial<PersonalReferralJob>,
  Context,
  RequireFields<PersonalReferralJobHasAlreadyPersonallyRequestedArgs, 'applicantUsername'>
> = async (parent: Partial<PersonalReferralJob>, args, { session }, info): Promise<boolean> => {
  const { linkedinJobId, referrerUsername } = parent;
  const { applicantUsername } = args;
  // console.log(applicantUsername, referrerUsername);
  const response: IReferralRequest = await ReferralRequestModel.findOne({
    $and: [
      {
        'applicantInfo.username': {
          $eq: applicantUsername,
        },
      },
      {
        'jobInfo.linkedinJobId': {
          $eq: linkedinJobId,
        },
      },
      {
        'referrersList.username': {
          $eq: referrerUsername,
        },
      },
    ],
  });
  // console.log(response);
  return !isNil(response);
};

export default hasAlreadyPersonallyRequestedResolver;
