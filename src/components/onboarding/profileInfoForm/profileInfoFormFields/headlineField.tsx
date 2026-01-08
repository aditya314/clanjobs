import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';

export default function HeadlineField() {
  return (
    <Field name="headline">
      {({ field, form }) => (
        <FormControl my={4}>
          <FormLabel>Your profile headline</FormLabel>
          <Input
            {...field}
            id="headline"
            placeholder="Data Structure & Algorithms | GSoC | Cryptography | ICPC Finalist | Operating Systems | University Gold medalist | AWS Certification "
          />
          <FormHelperText>
            Something you have achieved or learnt that has not been asked in the onboarding form
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}
