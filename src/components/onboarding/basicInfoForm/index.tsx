import { Box, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import FullNameField from '@src/components/onboarding/basicInfoForm/basicInfoFormFields/fullNameField';
import UsernameField from '@src/components/onboarding/basicInfoForm/basicInfoFormFields/usernameField';
import FresherFiled from '@src/components/onboarding/basicInfoForm/basicInfoFormFields/fresherField';
import YOEField from '@src/components/onboarding/basicInfoForm/basicInfoFormFields/yOEField';
import RoleField from '@src/components/onboarding/basicInfoForm/basicInfoFormFields/roleField';
import CoreSkillsField from '@src/components/onboarding/basicInfoForm/basicInfoFormFields/coreSkillsField';
import FamiliarSkillsField from '@src/components/onboarding/basicInfoForm/basicInfoFormFields/familiarSkillsField';
import SubmitBasicInfoButton, {
  updateUserBasicInfoData,
} from '@src/components/onboarding/basicInfoForm/basicInfoFormActions/submitBasicInfoButton';
import { useSession } from 'next-auth/client';
import { EMPTY_STRING } from '@src/coreConfigs/constants/common';
import { isNil, map } from 'lodash';

interface Values {
  name: string;
  username: string;
  isFresher: boolean;
  years: number;
  months: number;
  role: string;
  coreSkills: any;
  familiarSkills: any;
}

interface InitialFormValues {
  name: string;
  username?: string;
  isFresher?: boolean;
  years?: number;
  months?: number;
  coreSkills?: any;
  familiarSkills?: any;
}

export default function BasicInfoForm() {
  const router = useRouter();
  const toast = useToast();
  const [session, sessionLoading] = useSession();

  const initialValues: InitialFormValues = {
    name: session.user.name as string,
    username: EMPTY_STRING,
  };
  return (
    <Box py={4}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: Values, actions) => {
          let updateResponse = await updateUserBasicInfoData(session.user.email, values);
          if (isNil(updateResponse)) {
            toast({
              title: `Failed to update your info. Contact us to get this fixed.`,
              status: 'error',
              isClosable: true,
            });
          } else {
            await router.push('/onboarding/clan-info');
          }
        }}
      >
        {props => (
          <Form>
            <FullNameField />
            <UsernameField />
            <FresherFiled />
            {props.values.isFresher ? <></> : <YOEField />}
            <RoleField />
            <CoreSkillsField />
            <FamiliarSkillsField />
            <SubmitBasicInfoButton props={props} />
          </Form>
        )}
      </Formik>
    </Box>
  );
}
