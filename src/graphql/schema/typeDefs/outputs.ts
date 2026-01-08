import { gql } from 'apollo-server-micro';

export default gql`
  type SkillsAutocompleteResponse {
    skills: [SkillAutocomplete!]!
  }

  type CollegesAutocompleteResponse {
    colleges: [CollegeAutocomplete!]!
  }

  type CompaniesAutocompleteResponse {
    companies: [CompanyAutocomplete!]!
  }
  #to verify if payloads need to change
  type UpdateUserOnboardingBasicInfoPayload {
    onboardingUser: OnboardingUser
  }
  type UpdateUserOnboardingClanInfoPayload {
    onboardingUser: OnboardingUser
  }
  type UpdateUserOnboardingProfileInfoPayload {
    onboardingUser: OnboardingUser
  }
  type UpdateUserOnboardingJobPreferencePayload {
    onboardingUser: OnboardingUser
  }
  type UpdateReferralPayload {
    username: String!
    userType: UserType!
    referralState: ReferralState!
    referralRequestId: ID!
  }

  type AskReferralPayload {
    username: String
    jobId: ID
  }

  type UpdateReferralSettingsPayload {
    username: String!
  }

  type UpdateUserBasicInfoPayload {
    user: User
  }
  type UpdateUserClanInfoPayload {
    user: User
  }
  type UpdateUserProfileInfoPayload {
    user: User
  }
  type UpdateUserJobPreferencePayload {
    user: User
  }
`;
