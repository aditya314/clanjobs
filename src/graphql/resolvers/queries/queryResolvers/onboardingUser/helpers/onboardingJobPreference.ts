import { OnboardingJobPreference, OnboardingUser } from '@src/graphql/types';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';
import IUserOnboardingJobPreference from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingJobPreferenceModel/types';
import { UserOnboardingJobPreferenceModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingJobPreferenceModel';

const fetchUserOnboardingJobPreferenceDoc = async (email): Promise<IUserOnboardingJobPreference> =>
  await UserOnboardingJobPreferenceModel.findOne({ email: email });

const onboardingJobPreferenceResolver = async (
  parent: OnboardingUser,
  args,
  { session }
): Promise<OnboardingJobPreference> => {
  try {
    const userOnboardingJobPreference = await fetchUserOnboardingJobPreferenceDoc(parent.email);
    return {
      preferredRole: userOnboardingJobPreference.preferredRole,
      preferredLocations: userOnboardingJobPreference.preferredLocations,
      preferredCTC: userOnboardingJobPreference.preferredCTC,
      noticePeriod: userOnboardingJobPreference.noticePeriod,
      signupReason: userOnboardingJobPreference.signupReason,
      invitedBy: userOnboardingJobPreference.invitedBy,
    };
  } catch (error) {
    console.log(error);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
};

export default onboardingJobPreferenceResolver;
