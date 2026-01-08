import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

export default function DesignationField() {
  return (
    <Field name="designation">
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors.designation && form.touched.designation}
          isRequired
          my={4}
        >
          <FormLabel>Current designation</FormLabel>
          <Input
            {...field}
            id="designation"
            placeholder="Eg: Platform Engineer, Technology Analyst, Software Development Engineer 2"
          />
          <FormErrorMessage>{form.errors.designation}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
