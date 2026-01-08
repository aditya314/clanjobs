import { Field } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';

function validatePhoneNumber(value) {
  // https://stackoverflow.com/questions/17899107/how-to-validate-a-letter-and-whitespace-only-input-via-javascript-regular-expres
  let error;
  if (!value) {
    error = 'Phone number is required';
  } else if (!/^[6-9]\d{9}$/.test(value)) {
    error = 'Please enter a valid phone number';
  }
  return error;
}

export default function PhoneNumberField() {
  return (
    <Field name="phoneNumber" validate={validatePhoneNumber}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors.phoneNumber && form.touched.phoneNumber}
          isRequired
          my={4}
          mr={12}
        >
          <FormLabel>Your contact number</FormLabel>
          <InputGroup>
            <InputLeftAddon>{'+91'}</InputLeftAddon>
            <Input type="tel" {...field} id="phoneNumber" placeholder="your phone number" />
          </InputGroup>
          <FormHelperText>We will never share your phone number.</FormHelperText>
          <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
