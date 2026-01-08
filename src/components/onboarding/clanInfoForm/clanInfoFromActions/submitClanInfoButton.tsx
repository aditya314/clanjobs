import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { gql } from '@apollo/client';
import { apolloGQLClient } from '@pages/_app';
import { map } from 'lodash';

export const UPDATE_CLAN_INFO = gql`
  mutation updateUserOnboardingClanInfo(
    $updateUserOnboardingClanInfoInput: UpdateUserOnboardingClanInfoInput!
  ) {
    updateUserOnboardingClanInfo(input: $updateUserOnboardingClanInfoInput) {
      onboardingUser {
        email
        lastCompletedState
      }
    }
  }
`;

const getClearbitCompanyDomainThroughURL = url => {
  //"https://logo.clearbit.com/mindtickle.com" => ['https:', '', 'logo.clearbit.com', 'mindtickle.com']
  return url.split('/')[3];
};

const buildCompanyInfoRequestFromFormValue = companyField =>
  companyField
    ? {
        name: companyField.value,
        domain: getClearbitCompanyDomainThroughURL(companyField.label.props.logo),
      }
    : null;

const buildEducationInfoRequestFromFromValue = educationInfo =>
  educationInfo
    ? {
        collegeId: educationInfo.collegeName.value,
        yearOfGraduation: educationInfo.gradYear.value,
        degree: educationInfo.degree.value,
        // TODO: note the difference of z and s. We should correct it later
        specialization: educationInfo.specialisation.value,
      }
    : null;

//TODO: should add typings of form values and GQL if we see bugs
export const updateUserClanInfoData = async (email, values) => {
  try {
    const mutationResponse = await apolloGQLClient.mutate({
      mutation: UPDATE_CLAN_INFO,
      variables: {
        updateUserOnboardingClanInfoInput: {
          email: email,
          currentDesignation: values?.designation,
          currentCompanyInfo: buildCompanyInfoRequestFromFormValue(values.currentCompany),
          pastCompaniesInfo: map(values.previousCompanies, buildCompanyInfoRequestFromFormValue),
          education: map(
            map(values.educationList, item => item.educationInfo),
            buildEducationInfoRequestFromFromValue
          ),
          resume: values.resumeFile.s3Path,
        },
      },
    });
    return mutationResponse;
  } catch (e) {
    console.log('Failed to fetch Mutation ', JSON.stringify(e));
    return null;
  }
};

export default function SubmitClanInfoButton(props) {
  return (
    <Button
      mt={4}
      variant={'variantSolid'}
      isLoading={props.isSubmitting}
      type="submit"
      rightIcon={<ArrowForwardIcon />}
    >
      Next (2 of 4)
    </Button>
  );
}
