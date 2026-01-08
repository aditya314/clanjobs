import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

function validateName(value) {
  // https://stackoverflow.com/questions/17899107/how-to-validate-a-letter-and-whitespace-only-input-via-javascript-regular-expres
  let error;
  if (!value) {
    error = 'Full name is required';
  } else if (!/^[A-Za-z\s]+$/.test(value)) {
    error = 'Full Name can only have letters and spaces';
  }
  return error;
}

export default function FullNameField() {
  return (
    <Field name="name" validate={validateName}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors.name && form.touched.name} isRequired my={4}>
          <FormLabel>Full name</FormLabel>
          <Input {...field} id="name" placeholder="name" />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
