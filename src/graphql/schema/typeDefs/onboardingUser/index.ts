import { gql } from 'apollo-server-micro';

export default gql`
  type OnboardingBasicInfo {
    name: String!
    username: String!
    isFresher: Boolean!
    role: String!
    yearsOfExperience: YearsOfExperience!
    skills: Skills!
  }

  type OnboardingClanInfo {
    currentDesignation: String
    currentCompany: Company
    pastCompanies: [Company!]
    education: [EducationInfo!]!
    resumeUrl: String!
  }

  type OnboardingProfileInfo {
    profilePicUrl: String
    profileHeadline: String
    codingProfiles: [CodingProfile!]
    phoneNumber: String!
    gender: Gender!
  }

  type OnboardingJobPreference {
    preferredRole: String!
    preferredLocations: [String!]
    preferredCTC: Int! #In Lakhs per annum
    noticePeriod: Int! #In days
    signupReason: String!
    invitedBy: String!
  }

  type OnboardingUser {
    email: String!
    username: String
    isFresher: Boolean
    lastCompletedState: OnboardingState!
    onboardingBasicInfo: OnboardingBasicInfo
    onboardingClanInfo: OnboardingClanInfo
    onboardingProfileInfo: OnboardingProfileInfo
    onboardingJobPreference: OnboardingJobPreference
  }
`;
