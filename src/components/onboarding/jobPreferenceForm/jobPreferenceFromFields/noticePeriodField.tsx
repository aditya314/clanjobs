import {
  FormControl,
  FormErrorMessage,
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

function validateNoticePeriod(value) {
  let error;
  if (value != 0 && !value) {
    //just !value will give true since value is Number
    error = 'Notice period is required for matching you to appropriate roles';
  }
  return error;
}

export default function NoticePeriodField() {
  return (
    <Field name="noticePeriod" validate={validateNoticePeriod}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors.noticePeriod && form.touched.noticePeriod}
          isRequired
          my={4}
        >
          <FormLabel>What is your current job&apos;s notice period?</FormLabel>
          <InputGroup>
            <NumberInput
              id="noticePeriod"
              {...field}
              onChange={val => form.setFieldValue(field.name, Number(val))}
              min={0}
              max={150}
            >
              <NumberInputField placeholder={'Number of days of notice period'} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <InputRightAddon>{'days'}</InputRightAddon>
          </InputGroup>
          <FormErrorMessage>{form.errors.noticePeriod}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
