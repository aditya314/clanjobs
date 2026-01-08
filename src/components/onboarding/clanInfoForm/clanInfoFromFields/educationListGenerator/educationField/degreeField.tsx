import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { keys, map } from 'lodash';
import MultiSelect from '@src/components/common/ChakraSelect';

export enum DEGREE {
  B_TECH = 'Bachelor of Technology (B. Tech)',
  BE = 'Bachelor of Engineering (B.E)',
  M_TECH = 'Master of Technology (M.Tech)',
  MS = 'Master of Science (M.Sc)',
  B_SC = 'Bachelor of Science (B.Sc)',
  ME = 'Master of Engineering (M.E)',
  B_ARCH = 'Bachelor of Architecture',
  PHD = 'Doctor of Philosophy',
}

function validateDegree(value) {
  value = value?.value;
  let error;
  if (!keys(DEGREE).includes(value)) error = 'Please fill degree field with correct value';
  return error;
}

function hasDegreeFieldErrored(form, identifier) {
  return (
    form.errors.educationList &&
    form.errors.educationList.length > Number(identifier) &&
    form.errors.educationList[Number(identifier)]?.educationInfo.degree
  );
}

function isDegreeFieldTouched(form, identifier) {
  return (
    form.touched.educationList &&
    form.touched.educationList.length > Number(identifier) &&
    form.touched.educationList[Number(identifier)]?.educationInfo.degree
  );
}

export default function DegreeField({ identifier }) {
  return (
    <Field name={`educationList[${identifier}].educationInfo.degree`} validate={validateDegree}>
      {({ field, form }) => (
        <FormControl
          isInvalid={
            hasDegreeFieldErrored(form, identifier) && isDegreeFieldTouched(form, identifier)
          }
          isRequired
          my={4}
          mr={12}
        >
          <FormLabel>College Degree</FormLabel>
          {/*<>{console.log('Form inside DegreeField', form, field)}</>*/}
          <MultiSelect
            isMulti={false}
            {...field}
            id={`educationList[${identifier}].educationInfo.degree`}
            placeholder="Select the degree you obtained"
            options={map(keys(DEGREE), degree => ({
              label: DEGREE[degree],
              value: degree,
            }))}
            onChange={option => {
              form.setFieldValue(field.name, option);
              form.setFieldTouched(field.name, true, true);
            }}
          />
          <FormErrorMessage>{hasDegreeFieldErrored(form, identifier)}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
