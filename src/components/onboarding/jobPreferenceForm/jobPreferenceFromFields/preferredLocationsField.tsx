import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import MultiSelect from '@components/common/ChakraSelect';

function validatePreferredLocations(value) {
  let error;
  if (value?.length > 3) {
    error = 'Please keep the locations less than 3';
  }
  return error;
}

export default function PreferredLocationsField() {
  return (
    <Field name="preferredLocations" validate={validatePreferredLocations}>
      {({ field, form }) => (
        <FormControl
          my={4}
          isInvalid={
            (form.errors.preferredLocations && form.touched.preferredLocations) ||
            (form.errors.preferredLocations && form.submitCount)
          }
        >
          <FormLabel>Add upto 3 locations you want to work from</FormLabel>
          <MultiSelect
            isMulti={true}
            name="preferredLocations"
            placeholder="Select work locations"
            closeMenuOnSelect={true}
            options={[
              { label: 'Noida', value: 'NOIDA' },
              { label: 'Mumbai', value: 'MUMBAI' },
              { label: 'Pune', value: 'PUNE' },
              { label: 'Bangalore', value: 'BANGALORE' },
              { label: 'Hyderabad', value: 'HYDERABAD' },
              { label: 'Gurugram', value: 'GURUGRAM' },
              { label: 'Chennai', value: 'CHENNAI' },
              { label: 'Remote', value: 'REMOTE' },
            ]}
            {...field}
            onChange={option => {
              form.setFieldValue(field.name, option);
            }}
          />
          <FormErrorMessage>{form.errors.preferredLocations}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
