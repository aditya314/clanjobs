import { gql } from 'apollo-server-micro';

export default gql`
  type PersonalDetails {
    phoneNumber: String!
    gender: Gender!
    signUpReason: String
    invitedBy: String
  }

  type WorkExperience {
    currentDesignation: String
    currentCompany: Company
    pastCompanies: [Company!]
  }

  type EducationDetails {
    latestCollegeName: String!
    education: [EducationInfo!]!
  }

  type Clan {
    id: ID!
    name: String!
    logoUrl: String
    sourceId: ID!
    clanType: ClanType!
  }

  type JobPreference {
    preferredRole: String!
    preferredLocations: [String!]
    preferredCTC: Int! #In Lakhs per annum
    noticePeriod: Int! #In days
  }

  type ReferralSettings {
    isPublic: Boolean
    eligibleClans: [Clan!]
  }

  type User {
    email: String!
    name: String!
    username: ID!
    isFresher: Boolean!
    role: String!
    yearsOfExperience: YearsOfExperience!
    resumeUrl: String!
    profilePicUrl: String
    profileHeadline: String
    clans: [Clan!]!
    skills: Skills!
    workExperience: WorkExperience!
    educationDetails: EducationDetails!
    personalDetails: PersonalDetails!
    jobPreference: JobPreference!
    referralSettings: ReferralSettings!
    codingProfiles: [CodingProfile]!
    gemCount: Int!
    askedReferrals(
      after: ID
      before: ID
      first: Int
      last: Int
      filters: AskedReferralFilter
    ): AskedReferralConnection!
    referralRequests(
      after: ID
      before: ID
      first: Int
      last: Int
      filters: ReferralRequestFilter
    ): ReferralRequestConnection!
  }
`;
