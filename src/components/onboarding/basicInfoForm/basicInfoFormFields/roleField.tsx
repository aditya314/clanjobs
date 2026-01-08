import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { keys, map } from 'lodash';
import MultiSelect from '@src/components/common/ChakraSelect';

export enum engineeringRoles {
  FRONTEND_ENGINEER = 'Frontend Engineer',
  BACKEND_ENGINEER = 'Backend Engineer',
  FULLSTACK_ENGINEER = 'Full-Stack Engineer',
  ANDROID_ENGINEER = 'Android Engineer',
  IOS_ENGINEER = 'iOS Engineer',
  TEST_ENGINEER = 'Software Engineer in Test /QA Engineer',
  DEVOPS_ENGINEER = 'DevOps Engineer',
  SECURITY_ENGINEER = 'Security Engineer',
  BIGDATA_ENGINEER = 'Big Data / DWH / ETL Engineer',
  EMBEDDED_ENGINEER = 'Embedded / Kernel Development engineer',
}

function validateRole(value) {
  value = value?.value;
  let error;
  if (!keys(engineeringRoles).includes(value)) error = 'Please fill role field with correct value';
  return error;
}

export default function RoleField() {
  return (
    <Field name="role" validate={validateRole}>
      {({ field, form }) => (
        <FormControl
          id={'role'}
          isInvalid={
            (form.errors.role && form.touched.role) || (form.errors.role && form.submitCount)
          }
          isRequired
          my={4}
        >
          {form.values.isFresher ? (
            <FormLabel>Which role are you interested in?</FormLabel>
          ) : (
            <FormLabel>What kind of engineer are you?</FormLabel>
          )}
          {/*<>{console.log('Role field', form, field)}</>*/}
          <MultiSelect
            isMulti={false}
            {...field}
            placeholder="Select your job role"
            options={map(keys(engineeringRoles), role => ({
              label: engineeringRoles[role],
              value: role,
            }))}
            onChange={option => {
              form.setFieldValue(field.name, option);
            }}
          />
          <FormErrorMessage>{form.errors.role}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
