import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Field } from 'formik';

function validateYears(value) {
  let error;
  if (value != 0 && !value) {
    //just !value will give true since value is Number
    error = 'years is required in experience';
  } else if (!(Number.isInteger(value) && Number(value) >= 0)) {
    error = 'year should be a whole number';
  }
  return error;
}

export default function YearsField() {
  return (
    <Field name="years" validate={validateYears}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors.years && form.touched.years}
          id="years"
          isRequired
          my={4}
        >
          <InputGroup>
            <NumberInput
              id="years"
              {...field}
              onChange={val => form.setFieldValue(field.name, Number(val))}
              min={0}
            >
              <NumberInputField placeholder={'years in whole number'} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <InputRightAddon>{'years'}</InputRightAddon>
          </InputGroup>
          <FormErrorMessage>{form.errors.years}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
