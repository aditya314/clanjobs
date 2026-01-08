import { gql } from 'apollo-server-micro';

export default gql`
  type TodoMVC {
    todoId: ID!
    completed: Boolean!
    description: String!
  }
`;
