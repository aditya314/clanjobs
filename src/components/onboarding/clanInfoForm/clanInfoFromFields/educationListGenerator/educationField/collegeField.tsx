import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { AsyncSelect } from '@src/components/common/ChakraSelect';
import { map } from 'lodash';
import { gql } from '@apollo/client';
import { CollegeAutocomplete } from '@src/graphql/types';
import { apolloGQLClient } from '@pages/_app';

export const GET_COLLEGES_AUTOCOMPLETE = gql`
  mutation getCollegesAutocomplete($prefix: String!) {
    getCollegesAutocomplete(prefix: $prefix) {
      colleges {
        id
        name
      }
    }
  }
`;

function getOptionsFromCollegeList(collegeList: Array<CollegeAutocomplete>) {
  return map(collegeList, college => ({
    value: college.id,
    label: college.name,
  }));
}

export async function getCollegesOptions(text) {
  try {
    const mutationResponse = await apolloGQLClient.mutate({
      mutation: GET_COLLEGES_AUTOCOMPLETE,
      variables: {
        prefix: text,
      },
    });
    return getOptionsFromCollegeList(mutationResponse.data.getCollegesAutocomplete.colleges);
  } catch (e) {
    console.log('Failed to fetch Mutation ', e);
  }
}

function validateCollege(value) {
  value = value?.value;
  let error;
  if (!value || value.length == 0) {
    error = 'College name needs to be filled';
  }
  return error;
}

function hasCollegeNameFieldErrored(form, identifier) {
  return (
    form.errors.educationList &&
    form.errors.educationList.length > Number(identifier) &&
    form.errors.educationList[Number(identifier)]?.educationInfo.collegeName
  );
}

function isCollegeNameFieldTouched(form, identifier) {
  return (
    form.touched.educationList &&
    form.touched.educationList.length > Number(identifier) &&
    form.touched.educationList[Number(identifier)]?.educationInfo.collegeName
  );
}

export default function CollegeField({ identifier }) {
  return (
    <Field
      name={`educationList[${identifier}].educationInfo.collegeName`}
      validate={validateCollege}
    >
      {({ field, form }) => (
        <FormControl
          isRequired
          my={4}
          isInvalid={
            (hasCollegeNameFieldErrored(form, identifier) &&
              isCollegeNameFieldTouched(form, identifier)) ||
            (hasCollegeNameFieldErrored(form, identifier) && form.submitCount)
          }
        >
          <FormLabel>Your college name</FormLabel>
          <AsyncSelect
            name="collegeName"
            loadOptions={getCollegesOptions}
            placeholder="Type ahead to get college names..."
            closeMenuOnSelect={true}
            {...field}
            onChange={option => {
              form.setFieldValue(field.name, option);
            }}
            props={field}
          />
          <FormErrorMessage>{hasCollegeNameFieldErrored(form, identifier)}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
