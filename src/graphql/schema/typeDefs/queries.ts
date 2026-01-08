import { gql } from 'apollo-server-micro';

export default gql`
  type Query {
    allTodos: [TodoMVC!]!
    Todo(todoId: ID!): TodoMVC

    onboardingUser(email: String!): OnboardingUser
    user(username: ID!): User!

    jobs(
      after: ID
      before: ID
      first: Int
      last: Int
      username: String!
      filters: JobFilter
    ): JobConnection!

    personalReferralJobs(
      after: ID
      before: ID
      first: Int
      last: Int
      referrerUsername: String!
      filters: PersonalReferralJobFilter
    ): PersonalReferralJobConnection!
  }
`;
