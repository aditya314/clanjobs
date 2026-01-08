import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { AsyncSelect } from '@src/components/common/ChakraSelect';
import { map } from 'lodash';
import { gql } from '@apollo/client';
import { apolloGQLClient } from '@pages/_app';
import SelectCompanyItemLabel from '@components/onboarding/autoCompleteItemLabels/selectCompanyItemLabel';
import { CompanyAutocomplete } from '@src/graphql/types';

export const GET_COMPANIES_AUTOCOMPLETE = gql`
  mutation getCompaniesAutocomplete($prefix: String!) {
    getCompaniesAutocomplete(prefix: $prefix) {
      companies {
        name
        logoUrl
      }
    }
  }
`;

function getOptionsWithLogosFromCompanyList(companyList: Array<CompanyAutocomplete>) {
  return map(companyList, company => ({
    value: company.name,
    label: <SelectCompanyItemLabel logo={company.logoUrl} name={company.name} />,
  }));
}

export async function getCompanyOptions(text) {
  try {
    const mutationResponse = await apolloGQLClient.mutate({
      mutation: GET_COMPANIES_AUTOCOMPLETE,
      variables: {
        prefix: text,
      },
    });
    return getOptionsWithLogosFromCompanyList(
      mutationResponse.data.getCompaniesAutocomplete.companies
    );
  } catch (e) {
    console.log('Failed to fetch Mutation ', e);
  }
}

function validateCurrentCompany(value) {
  value = value?.value;
  let error;
  if (!value || value.length == 0) {
    error = 'Current company needs to be filled';
  }
  return error;
}

export default function CurrentCompanyField() {
  return (
    <Field name="currentCompany" validate={validateCurrentCompany}>
      {({ field, form }) => (
        <FormControl
          id={'currentCompany'}
          isRequired
          my={4}
          isInvalid={
            (form.errors.currentCompany && form.touched.currentCompany) ||
            (form.errors.currentCompany && form.submitCount)
          }
        >
          <FormLabel>Your current company </FormLabel>
          <AsyncSelect
            name="currentCompany"
            loadOptions={getCompanyOptions}
            placeholder="Type ahead to get company names..."
            closeMenuOnSelect={true}
            {...field}
            onChange={option => {
              form.setFieldValue(field.name, option);
            }}
            props={field}
          />
          <FormErrorMessage>{form.errors.currentCompany}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
