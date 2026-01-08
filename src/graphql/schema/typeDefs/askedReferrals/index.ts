import { gql } from 'apollo-server-micro';

export default gql`
  type AskedReferralStat {
    referralState: ReferralState!
    referrerCount: Int!
  }

  type AskedReferral {
    jobInfo: JobInfo!
    referralState: ReferralState!
    appliedOn: Int!
    askedReferralStats: [AskedReferralStat!]!
    acceptedReferrers: [String!]
  }

  type AskedReferralEdge {
    node: AskedReferral!
    cursor: ID!
  }

  type AskedReferralConnection {
    pageInfo: PageInfo!
    nodes: [AskedReferral]
    edges: [AskedReferralEdge]
    totalCount: Int!
  }
`;
