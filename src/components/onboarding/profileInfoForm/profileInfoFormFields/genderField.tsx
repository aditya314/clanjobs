import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react';
import { keys, map } from 'lodash';
import MultiSelect from '@components/common/ChakraSelect';
import { GENDER } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingProfileInfoModel/types';

function validateGender(value) {
  value = value?.value;
  let error;
  if (!keys(GENDER).includes(value)) error = 'Please fill gender field with correct value';
  return error;
}

export default function GenderField() {
  return (
    <Field name="gender" validate={validateGender}>
      {({ field, form }) => (
        <FormControl
          isInvalid={
            (form.errors.gender && form.touched.gender) || (form.errors.gender && form.submitCount)
          }
          isRequired
          my={4}
        >
          <FormLabel>Your gender is?</FormLabel>
          <MultiSelect
            isMulti={false}
            {...field}
            placeholder="Select your gender"
            options={map(keys(GENDER), gender => ({
              label: GENDER[gender],
              value: gender,
            }))}
            onChange={option => {
              form.setFieldValue(field.name, option);
            }}
          />
          <FormHelperText>We need this for gender focused jobs.</FormHelperText>
          <FormErrorMessage>{form.errors.role}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
