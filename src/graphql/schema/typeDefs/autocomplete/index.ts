import { gql } from 'apollo-server-micro';

export default gql`
  type SkillAutocomplete {
    id: ID!
    name: String!
    logoUrl: String!
  }
  type CollegeAutocomplete {
    id: ID!
    name: String!
    logoUrl: String # non-mandatory, since not implemented currently
  }
  type CompanyAutocomplete {
    name: String! # no id, since powered by clearbit not db
    logoUrl: String!
  }
`;
