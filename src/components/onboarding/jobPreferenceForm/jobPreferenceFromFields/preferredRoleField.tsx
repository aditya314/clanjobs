import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { keys, map } from 'lodash';
import MultiSelect from '@components/common/ChakraSelect';
import { ROLE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';

function validateRole(value) {
  value = value?.value;
  let error;
  if (!keys(ROLE).includes(value)) error = 'Please fill role field with correct value';
  return error;
}

export default function PreferredRoleField() {
  return (
    <Field name="preferredRole" validate={validateRole}>
      {({ field, form }) => (
        <FormControl
          isInvalid={
            (form.errors.preferredRole && form.touched.preferredRole) ||
            (form.errors.preferredRole && form.submitCount)
          }
          isRequired
          my={4}
        >
          <FormLabel>What job role do you want?</FormLabel>
          {/*<>{console.log('Role field', form, field)}</>*/}
          <MultiSelect
            isMulti={false}
            {...field}
            placeholder="Select preferred job role"
            options={map(keys(ROLE), role => ({
              label: ROLE[role],
              value: role,
            }))}
            onChange={option => {
              form.setFieldValue(field.name, option);
            }}
          />
          <FormErrorMessage>{form.errors.preferredRole}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
