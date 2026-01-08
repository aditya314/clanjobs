import {
  Job,
  JobHasAlreadyRequestedArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '@src/graphql/types';
import { Context } from '@src/graphql/context';
import { ReferralRequestModel } from '@src/mongoDb/daoModels/referralModels/referralRequestModel';
import IReferralRequest from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { isNil } from 'lodash';

const hasAlreadyRequestedResolver: Resolver<
  ResolversTypes['Boolean'],
  Partial<Job>,
  Context,
  RequireFields<JobHasAlreadyRequestedArgs, 'username'>
> = async (parent: Partial<Job>, args, { session }, info): Promise<boolean> => {
  const { linkedinJobId } = parent;
  const { username } = args;
  const response: IReferralRequest = await ReferralRequestModel.findOne({
    $and: [
      {
        'applicantInfo.username': {
          $eq: username,
        },
      },
      {
        'jobInfo.linkedinJobId': {
          $eq: linkedinJobId,
        },
      },
    ],
  });
  return !isNil(response);
};

export default hasAlreadyRequestedResolver;
