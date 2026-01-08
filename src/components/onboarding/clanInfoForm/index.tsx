import { Formik, Form } from 'formik';
import { Box, useToast } from '@chakra-ui/react';
import SubmitClanInfoButton, {
  updateUserClanInfoData,
} from '@src/components/onboarding/clanInfoForm/clanInfoFromActions/submitClanInfoButton';
import DesignationField from '@src/components/onboarding/clanInfoForm/clanInfoFromFields/designationField';
import CurrentCompanyField from '@src/components/onboarding/clanInfoForm/clanInfoFromFields/currentCompanyField';
import PreviousCompaniesField from '@src/components/onboarding/clanInfoForm/clanInfoFromFields/previousCompaniesField';
import EducationListGenerator from '@src/components/onboarding/clanInfoForm/clanInfoFromFields/educationListGenerator';
import { useRouter } from 'next/router';
import { EMPTY_STRING } from '@src/coreConfigs/constants/common';
import ResumeUploaderField from '@components/onboarding/clanInfoForm/clanInfoFromFields/resumeUploaderField';
import { isNil } from 'lodash';

export default function ClanInfoForm({ session }) {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box py={4}>
      <Formik
        initialValues={{
          designation: '',
          educationList: [
            {
              id: 0,
              educationInfo: {
                degree: undefined,
                specialisation: undefined,
                gradYear: undefined,
                collegeName: undefined,
              },
            },
          ],
          resumeFile: {
            name: EMPTY_STRING,
            content: null,
            s3Path: {
              bucket: null,
              key: null,
            },
          },
        }}
        onSubmit={async (values, actions) => {
          let updateResponse = await updateUserClanInfoData(session.user.email, values);
          if (isNil(updateResponse)) {
            toast({
              title: `Failed to update your info. Contact us to get this fixed.`,
              status: 'error',
              isClosable: true,
            });
          } else {
            await router.push('/onboarding/profile-info');
          }
        }}
      >
        {props => (
          <Form>
            {session.isFresher ? (
              <></>
            ) : (
              <>
                <DesignationField />
                <CurrentCompanyField />
                <PreviousCompaniesField />
              </>
            )}
            <EducationListGenerator />
            <ResumeUploaderField />
            <SubmitClanInfoButton props={props} />
          </Form>
        )}
      </Formik>
    </Box>
  );
}
