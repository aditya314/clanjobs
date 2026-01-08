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

function validateMonths(value) {
  let error;
  if (value != 0 && !value) {
    //just !value will give true since value is Number
    error = 'months is required in experience';
  } else if (!(Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 12)) {
    error = 'months should be a whole number less than equal to 12';
  }
  return error;
}

export default function MonthsField() {
  return (
    <Field name="months" validate={validateMonths}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors.months && form.touched.months}
          id="months"
          isRequired
          my={4}
        >
          <InputGroup>
            <NumberInput
              id="months"
              {...field}
              onChange={val => form.setFieldValue(field.name, Number(val))}
              min={0}
              max={11}
            >
              <NumberInputField placeholder={'months in whole number'} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <InputRightAddon>{'months'}</InputRightAddon>
          </InputGroup>
          <FormErrorMessage>{form.errors.months}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
