import { Field } from 'formik';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { keys, map } from 'lodash';
import MultiSelect from '@components/common/ChakraSelect';

export enum SIGNUP_REASON {
  REFERRER = 'REFERRER',
  APPLICANT = 'APPLICANT',
}

export default function SignUpReasonField() {
  return (
    <Field name="signUpReason">
      {({ field, form }) => (
        <FormControl my={2} mr={12}>
          <FormLabel>Why did you join ClanJobs?</FormLabel>
          <MultiSelect
            isMulti={false}
            {...field}
            placeholder="What will you use ClanJobs for"
            options={map(keys(SIGNUP_REASON), reason => ({
              label:
                reason == SIGNUP_REASON.REFERRER
                  ? 'REFERRER : I am interested in referring people to my company'
                  : 'APPLICANT : I am looking to get tech job referrals',
              value: reason,
            }))}
            onChange={option => {
              form.setFieldValue(field.name, option);
            }}
          />
        </FormControl>
      )}
    </Field>
  );
}
