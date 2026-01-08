import { gql } from 'apollo-server-micro';

export default gql`
  input UpdateTodoInput {
    description: String
    completed: Boolean
  }
  input S3ParamsInput {
    bucket: String!
    key: String!
  }

  enum S3_OPERATION {
    GET_OBJECT
    PUT_OBJECT
  }
  input GetSignedS3URLInput {
    operation: S3_OPERATION!
    s3Params: S3ParamsInput!
  }

  input YearsOfExperienceInput {
    years: Int!
    months: Int!
  }

  input EducationInfoInput {
    collegeId: ID!
    yearOfGraduation: Int!
    degree: String!
    specialization: String!
  }

  input CodingProfileInput {
    platformName: String!
    username: String!
    url: String!
  }

  input S3PathInput {
    bucket: String!
    key: String!
  }

  input UpdateUserOnboardingBasicInfoInput {
    email: String!
    name: String!
    username: String!
    isFresher: Boolean!
    role: String!
    yearsOfExperience: YearsOfExperienceInput!
    coreSkills: [ID!]!
    familiarSkills: [ID!]!
  }

  input CompanyInfo {
    name: String!
    domain: String!
  }

  input UpdateUserOnboardingClanInfoInput {
    email: String!
    currentDesignation: String
    currentCompanyInfo: CompanyInfo
    pastCompaniesInfo: [CompanyInfo!]
    education: [EducationInfoInput!]!
    resume: S3PathInput!
  }

  input UpdateUserOnboardingProfileInfoInput {
    email: String!
    profilePic: S3PathInput
    profileHeadline: String
    codingProfiles: [CodingProfileInput!]
    phoneNumber: String!
    gender: Gender!
  }
  input UpdateUserOnboardingJobPreferenceInput {
    email: String!
    preferredRole: String!
    preferredLocations: [String!]
    preferredCTC: Int!
    noticePeriod: Int!
    signupReason: String
    invitedByUsername: String
  }

  input JobFilter {
    companies: [ID!]
    recency: Recency
    seniority: [Seniority!]
    #networkType -> for premium
  }
  input PersonalReferralJobFilter {
    recency: Recency
    seniority: [Seniority!]
  }

  input AskedReferralFilter {
    referralState: [ReferralState!]
  }

  input ReferralRequestFilter {
    referralState: [ReferralState!]
    networkType: [NetworkType!]
  }

  input UpdateReferralStateInput {
    username: String!
    userType: UserType!
    referralState: ReferralState!
    referralRequestId: ID!
  }

  input AskReferralInput {
    username: String!
    jobId: ID!
    isPersonalReferral: Boolean!
    referrerUsername: String
  }

  input UpdateReferralSettingsInput {
    username: String!
    isPublic: Boolean!
    eligibleClanIDs: [ID!]!
  }

  input UpdateUserBasicInfoInput {
    username: String!
    name: String
    isFresher: Boolean
    role: String
    yearsOfExperience: YearsOfExperienceInput
    coreSkills: [ID!]
    familiarSkills: [ID!]
  }

  input UpdateUserClanInfoInput {
    username: String!
    #    currentDesignation: String
    #    currentCompanyName: String
    #    pastCompaniesNames: [String!]
    #    education: [EducationInfoInput!]
    resumeUrl: String
  }

  input UpdateUserProfileInfoInput {
    username: String!
    profilePic: String
    profileHeadline: String
    codingProfiles: [CodingProfileInput!]
    phoneNumber: String
    gender: Gender
  }

  input UpdateUserJobPreferenceInput {
    username: String!
    preferredRole: String
    preferredLocations: [String!]
    preferredCTC: Int
    noticePeriod: Int
  }
`;
