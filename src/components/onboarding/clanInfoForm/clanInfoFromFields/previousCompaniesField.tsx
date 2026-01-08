import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { AsyncSelect } from '@components/common/ChakraSelect';
import { getCompanyOptions } from '@components/onboarding/clanInfoForm/clanInfoFromFields/currentCompanyField';

function validatePreviousCompanies(value) {
  let error;
  if (value?.length > 2) {
    error = 'Including more than 2 previous companies needs premium access';
  }
  return error;
}

export default function PreviousCompaniesField() {
  return (
    <Field name="previousCompanies" validate={validatePreviousCompanies}>
      {({ field, form }) => (
        <FormControl
          id={'previousCompany'}
          my={4}
          isInvalid={
            (form.errors.previousCompany && form.touched.previousCompany) ||
            (form.errors.previousCompany && form.submitCount)
          }
        >
          <FormLabel>Add all the companies you have previously worked for</FormLabel>
          <AsyncSelect
            isMulti
            name="previousCompanies"
            loadOptions={getCompanyOptions}
            placeholder="Type ahead to get company names..."
            closeMenuOnSelect={true}
            {...field}
            onChange={option => {
              form.setFieldValue(field.name, option);
            }}
            props={field}
          />
          <FormErrorMessage>{form.errors.previousCompany}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
