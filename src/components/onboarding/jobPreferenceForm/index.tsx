import { Formik, Form } from 'formik';
import { Box, Flex, useToast } from '@chakra-ui/react';
import PreferredRoleField from '@components/onboarding/jobPreferenceForm/jobPreferenceFromFields/preferredRoleField';
import PreferredLocationsField from '@components/onboarding/jobPreferenceForm/jobPreferenceFromFields/preferredLocationsField';
import PreferredCTCField from '@components/onboarding/jobPreferenceForm/jobPreferenceFromFields/preferredCTCField';
import NoticePeriodField from '@components/onboarding/jobPreferenceForm/jobPreferenceFromFields/noticePeriodField';
import SubmitJobPreferenceButton, {
  updateUserJobPreferenceData,
} from '@components/onboarding/jobPreferenceForm/jobPreferenceFormActions/submitJobPreferrenceButton';
import { useRouter } from 'next/router';
import SignUpReasonField from '@components/onboarding/jobPreferenceForm/jobPreferenceFromFields/signupReason';
import { useSession } from 'next-auth/client';
import InvitedByUsernameField from '@components/onboarding/jobPreferenceForm/jobPreferenceFromFields/invitedByUsername';
import { isNil } from 'lodash';

export default function JobPreferenceForm() {
  const router = useRouter();
  const [session, sessionLoading] = useSession();
  const toast = useToast();
  return (
    <Box py={4}>
      <Formik
        initialValues={{}}
        onSubmit={async (values, actions) => {
          let updateResponse = await updateUserJobPreferenceData(session.user.email, values);
          if (isNil(updateResponse)) {
            toast({
              title: `Failed to update your info. Contact us to get this fixed.`,
              status: 'error',
              isClosable: true,
            });
          } else {
            await router.push('/job-dashboard');
          }
        }}
      >
        <Form>
          <PreferredRoleField />
          <PreferredCTCField />
          {session.isFresher ? <></> : <NoticePeriodField />}
          <PreferredLocationsField />
          <Flex direction={['column', 'row']}>
            <SignUpReasonField />
            <InvitedByUsernameField />
          </Flex>
          <SubmitJobPreferenceButton />
        </Form>
      </Formik>
    </Box>
  );
}
