import { gql } from 'apollo-server-micro';

export default gql`
  type Mutation {
    getCompaniesAutocomplete(prefix: String!): CompaniesAutocompleteResponse!
    getCollegesAutocomplete(prefix: String!): CollegesAutocompleteResponse!
    getSkillsAutocomplete(prefix: String!): SkillsAutocompleteResponse!
    getSignedS3URL(input: GetSignedS3URLInput!): GetSignedS3URLResponse!

    isUsernameAvailable(input: String!): Boolean!
    createTodo(description: String!): TodoMVC!
    updateTodo(todoId: ID!, data: UpdateTodoInput!): TodoMVC

    #onboardingMutations
    updateUserOnboardingBasicInfo(
      input: UpdateUserOnboardingBasicInfoInput!
    ): UpdateUserOnboardingBasicInfoPayload
    updateUserOnboardingClanInfo(
      input: UpdateUserOnboardingClanInfoInput!
    ): UpdateUserOnboardingClanInfoPayload
    updateUserOnboardingProfileInfo(
      input: UpdateUserOnboardingProfileInfoInput!
    ): UpdateUserOnboardingProfileInfoPayload
    updateUserOnboardingJobPreference(
      input: UpdateUserOnboardingJobPreferenceInput!
    ): UpdateUserOnboardingJobPreferencePayload

    updateReferralState(input: UpdateReferralStateInput!): UpdateReferralPayload
    askReferral(input: AskReferralInput!): AskReferralPayload
    updateReferralSettings(input: UpdateReferralSettingsInput!): UpdateReferralSettingsPayload

    #editProfileMutations
    updateUserBasicInfo(input: UpdateUserBasicInfoInput!): UpdateUserBasicInfoPayload
    updateUserClanInfo(input: UpdateUserClanInfoInput!): UpdateUserClanInfoPayload
    updateUserProfileInfo(input: UpdateUserProfileInfoInput!): UpdateUserProfileInfoPayload
    updateUserJobPreference(input: UpdateUserJobPreferenceInput!): UpdateUserJobPreferencePayload
  }
`;
