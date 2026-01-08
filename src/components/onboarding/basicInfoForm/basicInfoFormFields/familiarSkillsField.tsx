import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { getSkillsOptions } from '@src/components/onboarding/basicInfoForm/basicInfoFormFields/coreSkillsField';
import { AsyncSelect } from '@components/common/ChakraSelect';

function validateFamiliarSkills(value) {
  let error;
  if (!value || value?.length == 0) {
    error = 'Select some familiar skills';
  } else if (value?.length > 8) {
    error = 'Try to select at most 8 familiar skills. Master of all is master of none!';
  }
  return error;
}

export default function FamiliarSkillsField() {
  return (
    <Field name="familiarSkills" validate={validateFamiliarSkills}>
      {({ field, form }) => (
        <FormControl
          id={'familiarSkills'}
          isRequired
          isInvalid={
            (form.errors.familiarSkills && form.touched.familiarSkills) ||
            (form.errors.familiarSkills && form.submitCount)
          }
          my={4}
        >
          <FormLabel>Select upto 8 skills you have familiarity with</FormLabel>
          <AsyncSelect
            isMulti
            name="familiarSkills"
            loadOptions={getSkillsOptions}
            placeholder="Type ahead to get skill options..."
            closeMenuOnSelect={true}
            {...field}
            onChange={option => {
              form.setFieldValue(field.name, option);
            }}
            props={field}
          />
          {/*<>{console.log('Props', props, 'Field', field, 'Form', form)}</>*/}
          <FormErrorMessage>{form.errors.familiarSkills}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
