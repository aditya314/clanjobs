import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { apolloGQLClient } from '@pages/_app';
import { gql } from '@apollo/client';
import { isNil, map } from 'lodash';

export const UPDATE_JOB_PREFERENCE_INFO = gql`
  mutation updateUserOnboardingJobPreference(
    $updateUserOnboardingJobPreferenceInput: UpdateUserOnboardingJobPreferenceInput!
  ) {
    updateUserOnboardingJobPreference(input: $updateUserOnboardingJobPreferenceInput) {
      onboardingUser {
        email
        lastCompletedState
      }
    }
  }
`;

//checking if username exists is done on backend, only validating regex here
const isUsernameValid = text => !isNil(text) && text.length !== 0 && /^[a-zA-Z0-9\-]+$/.test(text);

export const updateUserJobPreferenceData = async (email, values) => {
  try {
    const mutationResponse = await apolloGQLClient.mutate({
      mutation: UPDATE_JOB_PREFERENCE_INFO,
      variables: {
        updateUserOnboardingJobPreferenceInput: {
          email: email,
          preferredRole: values.preferredRole.value,
          preferredLocations: map(values.preferredLocations, location => location.value),
          preferredCTC: values.preferredCTC,
          noticePeriod: values.noticePeriod ?? 0,
          signupReason: values.signUpReason?.value,
          invitedByUsername: isUsernameValid(values.invitedByUsername)
            ? values.invitedByUsername
            : null,
        },
      },
    });
    return mutationResponse;
  } catch (e) {
    console.log('Failed to fetch Mutation ', JSON.stringify(e));
    return null;
  }
};

export default function SubmitJobPreferenceButton(props) {
  return (
    <Button
      mt={4}
      variant={'variantSolid'}
      isLoading={props.isSubmitting}
      type="submit"
      rightIcon={<ArrowForwardIcon />}
    >
      FINISH
    </Button>
  );
}
