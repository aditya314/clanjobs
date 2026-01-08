import { gql } from 'apollo-server-micro';

export default gql`
  type PageInfo {
    endCursor: ID
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: ID
  }
  type GetSignedS3URLResponse {
    signedURL: String!
    url: String!
  }

  type S3Path {
    bucket: String!
    key: String!
  }

  type YearsOfExperience {
    years: Int!
    months: Int!
  }

  type Skill {
    id: ID!
    name: String!
    logoUrl: String!
    #    logoKeyPath: S3Path!
  }

  type Skills {
    coreSkills: [Skill!]!
    familiarSkills: [Skill!]!
  }

  type Company {
    id: ID!
    name: String!
    logoUrl: String!
    #    logoKeyPath: S3Path!
    clanId: ID!
  }

  type EducationInfo {
    id: ID!
    name: String!
    yearOfGraduation: Int!
    degree: String!
    specialization: String!
    clanId: ID!
  }

  type CodingProfile {
    platformName: String!
    username: String!
    url: String!
  }

  type JobInfo {
    linkedinJobId: String!
    jobRole: String!
    jobUrl: String!
    company: Company!
    jobLocation: String!
  }
  type ApplicantInfo {
    name: String!
    profilePicUrl: String
    username: String!
    currentDesignation: String
    companyName: String
    latestCollegeName: String!
    resumeUrl: String!
    yearsOfExperience: YearsOfExperience!
    networkType: NetworkType!
  }
`;
