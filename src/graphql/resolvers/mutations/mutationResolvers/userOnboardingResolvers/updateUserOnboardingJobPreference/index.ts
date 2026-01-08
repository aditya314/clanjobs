import {
  MutationUpdateUserOnboardingJobPreferenceArgs,
  MutationUpdateUserOnboardingProfileInfoArgs,
  OnboardingState,
  UpdateUserOnboardingJobPreferencePayload,
} from '@src/graphql/types';
import { UserOnboardingAuthModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel';
import { ONBOARDING_STATE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';
import { UserOnboardingJobPreferenceModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingJobPreferenceModel';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';
import { createUserFromOnboardingDocs } from '@src/graphql/resolvers/mutations/mutationResolvers/userOnboardingResolvers/updateUserOnboardingJobPreference/helpers';

const updateUserOnboardingJobPreferenceResolver = async (
  _: any,
  args: MutationUpdateUserOnboardingJobPreferenceArgs,
  { session }
): Promise<UpdateUserOnboardingJobPreferencePayload> => {
  if (!session) {
    throw new Error(ErrorCodes.NOT_AUTHORIZED);
  }
  const {
    email,
    preferredRole,
    preferredLocations,
    preferredCTC,
    noticePeriod, //make sure notice period is sent as 0 for freshers
    signupReason,
    invitedByUsername,
  } = args.input;
  try {
    if (preferredLocations.length > 5) {
      console.log('More than 5 preferred locations');
      throw new Error(ErrorCodes.INVALID_INPUT);
    }
    await UserOnboardingJobPreferenceModel.updateOne(
      { email: email },
      {
        email: email,
        preferredRole: preferredRole,
        preferredLocations: preferredLocations,
        preferredCTC: preferredCTC,
        noticePeriod: noticePeriod,
        signupReason: signupReason,
        invitedBy: invitedByUsername,
      },
      { upsert: true }
    );

    await createUserFromOnboardingDocs(email, args.input);

    await UserOnboardingAuthModel.updateOne(
      { email: email },
      {
        lastCompletedState: ONBOARDING_STATE.JOB_PREFERENCE,
      },
      { upsert: true }
    );
    return {
      onboardingUser: {
        email: email,
        lastCompletedState: OnboardingState.JobPreference,
      },
    };
  } catch (e) {
    console.log(e);
    throw new Error(ErrorCodes.INVALID_INPUT);
  }
};

export default updateUserOnboardingJobPreferenceResolver;
