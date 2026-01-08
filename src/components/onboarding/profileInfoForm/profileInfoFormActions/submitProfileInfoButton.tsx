import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  hasUserUploadedPicture,
  uploadSessionProfilePicOnS3,
} from '@components/onboarding/profileInfoForm/profileInfoFormFields/profilePhotoField';
import { apolloGQLClient } from '@pages/_app';
import { gql } from '@apollo/client';
import { EMPTY_STRING } from '@src/coreConfigs/constants/common';
import { ASSETS_BUCKET } from '@src/coreConfigs/constants/enums';
import { buildCodingProfilesInfoRequestFromFromValue } from '@components/onboarding/profileInfoForm/profileInfoFormFields/codingProfilesField';

export const UPDATE_PROFILE_INFO = gql`
  mutation updateUserOnboardingProfileInfo(
    $updateUserOnboardingProfileInfoInput: UpdateUserOnboardingProfileInfoInput!
  ) {
    updateUserOnboardingProfileInfo(input: $updateUserOnboardingProfileInfoInput) {
      onboardingUser {
        email
        lastCompletedState
      }
    }
  }
`;

const buildProfilePicRequestFromFromValue = async (session, values, getSignedS3UrlMutation) => {
  let S3Path = values.profilePhoto.s3Path;
  try {
    if (!hasUserUploadedPicture(values)) {
      let { S3UploadKey } = await uploadSessionProfilePicOnS3(session, getSignedS3UrlMutation);
      S3Path.bucket = ASSETS_BUCKET.PROFILE_PICTURES;
      S3Path.key = S3UploadKey;
    }
    return S3Path;
  } catch (e) {
    console.log('Filed to upload ', JSON.stringify(e));
    return null;
  }
};

export const updateUserProfileInfoData = async (session, values, getSignedS3UrlMutation) => {
  try {
    const mutationResponse = await apolloGQLClient.mutate({
      mutation: UPDATE_PROFILE_INFO,
      variables: {
        updateUserOnboardingProfileInfoInput: {
          email: session.user.email,
          profileHeadline: values.headline !== EMPTY_STRING ? values.headline : null,
          codingProfiles: buildCodingProfilesInfoRequestFromFromValue(values),
          phoneNumber: values.phoneNumber,
          gender: values.gender.value,
          profilePic: await buildProfilePicRequestFromFromValue(
            session,
            values,
            getSignedS3UrlMutation
          ),
        },
      },
    });
    return mutationResponse;
  } catch (e) {
    console.log('Failed to fetch Mutation ', JSON.stringify(e));
    return null;
  }
};

export default function SubmitProfileInfoButton(props) {
  return (
    <Button
      mt={4}
      variant={'variantSolid'}
      isLoading={props.isSubmitting}
      type="submit"
      rightIcon={<ArrowForwardIcon />}
    >
      NEXT (3/4)
    </Button>
  );
}
