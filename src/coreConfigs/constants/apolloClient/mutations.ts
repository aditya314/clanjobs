import { gql } from '@apollo/client';

export const GET_SIGNED_S3_URL = gql`
  mutation test($input: GetSignedS3URLInput!) {
    getSignedS3URL(input: $input) {
      signedURL
    }
  }
`;
