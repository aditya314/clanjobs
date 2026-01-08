import { Box, Flex, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import HeadlineField from '@components/onboarding/profileInfoForm/profileInfoFormFields/headlineField';
import PhoneNumberField from '@components/onboarding/profileInfoForm/profileInfoFormFields/phoneNumberField';
import GenderField from '@components/onboarding/profileInfoForm/profileInfoFormFields/genderField';
import CodingProfileField from '@components/onboarding/profileInfoForm/profileInfoFormFields/codingProfilesField';
import SubmitProfileInfoButton, {
  updateUserProfileInfoData,
} from '@components/onboarding/profileInfoForm/profileInfoFormActions/submitProfileInfoButton';
import ProfilePhotoField from '@components/onboarding/profileInfoForm/profileInfoFormFields/profilePhotoField';
import { EMPTY_STRING } from '@src/coreConfigs/constants/common';
import { isNil } from 'lodash';
import { useMutation } from '@apollo/client';
import { GET_SIGNED_S3_URL } from '@src/coreConfigs/constants/apolloClient/mutations';
import { useSession } from 'next-auth/client';

export default function ProfileInfoForm() {
  const router = useRouter();
  const [session, sessionLoading] = useSession();
  const toast = useToast();
  const [getSignedS3UrlMutation] = useMutation(GET_SIGNED_S3_URL);
  return (
    <Box py={4}>
      <Formik
        initialValues={{
          headline: '',
          profilePhoto: {
            name: EMPTY_STRING,
            content: null,
            s3Path: {
              bucket: null,
              key: null,
            },
          },
        }}
        onSubmit={async (values, actions) => {
          let updateResponse = await updateUserProfileInfoData(
            session,
            values,
            getSignedS3UrlMutation
          );
          if (isNil(updateResponse)) {
            toast({
              title: `Failed to update your info. Contact us to get this fixed.`,
              status: 'error',
              isClosable: true,
            });
          } else {
            await router.push('/onboarding/job-preference');
          }
        }}
      >
        {props => (
          <Form>
            <ProfilePhotoField />
            <Flex direction={['column', 'row']}>
              <PhoneNumberField />
              <GenderField />
            </Flex>
            <HeadlineField />
            <CodingProfileField />
            <SubmitProfileInfoButton />
          </Form>
        )}
      </Formik>
    </Box>
  );
}
