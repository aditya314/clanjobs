import { gql } from 'apollo-server-micro';

export default gql`
  type ReferralRequest {
    applicantInfo: ApplicantInfo!
    referralState: ReferralState!
    jobInfo: JobInfo!
    appliedOn: Int!
  }

  type ReferralRequestEdge {
    node: ReferralRequest!
    cursor: ID!
  }

  type ReferralRequestConnection {
    pageInfo: PageInfo!
    nodes: [ReferralRequest]
    edges: [ReferralRequestEdge]
    totalCount: Int!
  }
`;
