import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { map } from 'lodash';
import MultiSelect from '@src/components/common/ChakraSelect';

const yearOptionsListLength = 20;
const maximumGraduationYear = new Date().getFullYear() + 4;
const gradYearOptionsList = Array.from(
  new Array(yearOptionsListLength),
  (val, index) => maximumGraduationYear - index
);

function validateGradYear(value) {
  value = value?.value;
  let error;
  if (!gradYearOptionsList.includes(value)) {
    error = 'Please fill degree field with correct value';
  }
  return error;
}

function hasGradYearFieldErrored(form, identifier) {
  return (
    form.errors.educationList &&
    form.errors.educationList.length > Number(identifier) &&
    form.errors.educationList[Number(identifier)]?.educationInfo.gradYear
  );
}

function isGradYearFieldTouched(form, identifier) {
  return (
    form.touched.educationList &&
    form.touched.educationList.length > Number(identifier) &&
    form.touched.educationList[Number(identifier)]?.educationInfo.gradYear
  );
}

export default function GradYearField({ identifier }) {
  return (
    <Field name={`educationList[${identifier}].educationInfo.gradYear`} validate={validateGradYear}>
      {({ field, form }) => (
        <FormControl
          isInvalid={
            hasGradYearFieldErrored(form, identifier) && isGradYearFieldTouched(form, identifier)
          }
          isRequired
          my={4}
        >
          <FormLabel>Graduation Year</FormLabel>
          {/*<>{console.log('Form inside Grad Field', form, field)}</>*/}
          <MultiSelect
            isMulti={false}
            {...field}
            id={`educationList[${identifier}].educationInfo.gradYear`}
            placeholder="Select the year you graduated"
            options={map(gradYearOptionsList, year => ({
              label: year,
              value: year,
            }))}
            onChange={option => {
              form.setFieldValue(field.name, option);
              form.setFieldTouched(field.name, true, true);
            }}
          />
          <FormErrorMessage>{hasGradYearFieldErrored(form, identifier)}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
