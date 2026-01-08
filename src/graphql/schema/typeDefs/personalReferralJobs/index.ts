import { gql } from 'apollo-server-micro';

export default gql`
  type PersonalReferralJob {
    referrerUsername: String!
    linkedinJobId: String!
    role: String!
    company: Company!
    location: String!
    recency: Recency!
    linkedInUrl: String!
    url: String
    seniority: Seniority
    postedDate: Int!
    hasAlreadyPersonallyRequested(applicantUsername: String!): Boolean!
    isEligible(applicantUsername: String!): Boolean!
    referralSettings: ReferralSettings!
    hasEnoughGems(applicantUsername: String!): Boolean!
  }

  type PersonalReferralJobEdge {
    node: PersonalReferralJob!
    cursor: ID!
  }

  type PersonalReferralJobConnection {
    pageInfo: PageInfo!
    nodes: [PersonalReferralJob]
    edges: [PersonalReferralJobEdge]
    totalCount: Int!
  }
`;
