import { MutationResolvers } from '../../types';
import updateTodoResolver from './mutationResolvers/updateTodo';
import getCompaniesAutocompleteResolver from '@src/graphql/resolvers/mutations/mutationResolvers/autocompleteResolvers/getCompaniesAutocomplete';
import getS3SignedURLResolver from '@src/graphql/resolvers/mutations/mutationResolvers/getSignedS3URL';
import getCollegesAutocompleteResolver from '@src/graphql/resolvers/mutations/mutationResolvers/autocompleteResolvers/getCollegesAutocomplete';
import getSkillsAutocompleteResolver from '@src/graphql/resolvers/mutations/mutationResolvers/autocompleteResolvers/getSkillsAutocomplete';
import updateUserOnboardingBasicInfoResolver from '@src/graphql/resolvers/mutations/mutationResolvers/userOnboardingResolvers/updateUserOnboardingBasicInfo';
import updateUserOnboardingProfileInfoResolver from '@src/graphql/resolvers/mutations/mutationResolvers/userOnboardingResolvers/updateUserOnboardingProfileInfo';
import updateUserOnboardingJobPreferenceResolver from '@src/graphql/resolvers/mutations/mutationResolvers/userOnboardingResolvers/updateUserOnboardingJobPreference';
import askReferralResolver from '@src/graphql/resolvers/mutations/mutationResolvers/askReferral';
import updateUserOnboardingClanInfoResolver from '@src/graphql/resolvers/mutations/mutationResolvers/userOnboardingResolvers/updateUserOnboardingClanInfo';
import updateReferralStateResolver from '@src/graphql/resolvers/mutations/mutationResolvers/updateReferralState';
import isUsernameAvailableResolver from '@src/graphql/resolvers/mutations/mutationResolvers/usernameAvailable';
import updateReferralSettingsResolver from '@src/graphql/resolvers/mutations/mutationResolvers/updateReferralSettings';

const mutationResolvers: MutationResolvers = {
  updateTodo: updateTodoResolver,
  getSignedS3URL: getS3SignedURLResolver,
  getCompaniesAutocomplete: getCompaniesAutocompleteResolver,
  getCollegesAutocomplete: getCollegesAutocompleteResolver,
  getSkillsAutocomplete: getSkillsAutocompleteResolver,
  isUsernameAvailable: isUsernameAvailableResolver,
  updateUserOnboardingBasicInfo: updateUserOnboardingBasicInfoResolver,
  updateUserOnboardingClanInfo: updateUserOnboardingClanInfoResolver,
  updateUserOnboardingProfileInfo: updateUserOnboardingProfileInfoResolver,
  updateUserOnboardingJobPreference: updateUserOnboardingJobPreferenceResolver,
  askReferral: askReferralResolver,
  updateReferralState: updateReferralStateResolver,
  updateReferralSettings: updateReferralSettingsResolver,
};

export default mutationResolvers;
