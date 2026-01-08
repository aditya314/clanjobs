import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Field } from 'formik';

function validateCTC(value) {
  let error;
  if (value != 0 && !value) {
    //just !value will give true since value is Number
    error = 'CTC is required for matching you to appropriate roles';
  }
  return error;
}

export default function PreferredCTCField() {
  return (
    <Field name="preferredCTC" validate={validateCTC}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors.preferredCTC && form.touched.preferredCTC}
          isRequired
          my={4}
        >
          <FormLabel>What is the expected CTC from your desired job?</FormLabel>
          <InputGroup>
            <NumberInput
              id="preferredCTC"
              {...field}
              onChange={val => form.setFieldValue(field.name, Number(val))}
              min={0}
              max={150}
            >
              <NumberInputField placeholder={'Round up to one lakh'} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <InputRightAddon>{'Lakh Rupees per Anum'}</InputRightAddon>
          </InputGroup>
          <FormHelperText>Expect 30% raise if you are switching jobs.</FormHelperText>
          <FormErrorMessage>{form.errors.preferredCTC}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
