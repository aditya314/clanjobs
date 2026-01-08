import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { gql } from '@apollo/client';
import { apolloGQLClient } from '@pages/_app';
import { map } from 'lodash';

export const UPDATE_BASIC_INFO = gql`
  mutation updateUserOnboardingBasicInfo(
    $updateUserOnboardingBasicInfoInput: UpdateUserOnboardingBasicInfoInput!
  ) {
    updateUserOnboardingBasicInfo(input: $updateUserOnboardingBasicInfoInput) {
      onboardingUser {
        email
        lastCompletedState
      }
    }
  }
`;

const getYOERequestFromField = values =>
  values.isFresher
    ? {
        years: 0,
        months: 0,
      }
    : {
        years: values.years,
        months: values.months,
      };

export const updateUserBasicInfoData = async (email, values) => {
  try {
    const mutationResponse = await apolloGQLClient.mutate({
      mutation: UPDATE_BASIC_INFO,
      variables: {
        updateUserOnboardingBasicInfoInput: {
          email: email,
          name: values.name,
          username: values.username,
          isFresher: values.isFresher ?? false,
          role: values.role.value,
          yearsOfExperience: getYOERequestFromField(values),
          coreSkills: map(values.coreSkills, skill => skill.value),
          familiarSkills: map(values.familiarSkills, skill => skill.value),
        },
      },
    });
    return mutationResponse;
  } catch (e) {
    console.log('Failed to fetch Mutation ', JSON.stringify(e));
    return null;
  }
};

export default function SubmitBasicInfoButton(props) {
  return (
    <Button
      mt={4}
      variant={'variantSolid'}
      isLoading={props.isSubmitting}
      type="submit"
      rightIcon={<ArrowForwardIcon />}
    >
      Next (1 of 4)
    </Button>
  );
}
