import { gql } from 'apollo-server-micro';

export default gql`
  type AcceptingReferrersClanWise {
    users: [User!]
    userCount: Int!
    clanInfo: Clan!
  }

  type AcceptingReferrersPublic {
    users: [User!]
    userCount: Int!
  }

  type AcceptingReferrers {
    acceptingReferrersClanWise: [AcceptingReferrersClanWise!]!
    acceptingReferrersPublic: AcceptingReferrersPublic!
  }

  type Job {
    linkedinJobId: String!
    role: String!
    company: Company!
    location: String!
    recency: Recency!
    linkedInUrl: String!
    url: String
    seniority: Seniority
    postedDate: Int!
    hasEnoughGems: Boolean!
    hasAlreadyRequested(username: String!): Boolean!
    acceptingReferrers(username: String!): AcceptingReferrers!
  }

  type JobEdge {
    node: Job!
    cursor: ID!
  }

  type JobConnection {
    pageInfo: PageInfo!
    nodes: [Job]
    edges: [JobEdge]
    totalCount: Int!
  }
`;
