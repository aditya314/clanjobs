import { Field } from 'formik';
import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';

export default function CodeforcesField() {
  return (
    <Field name="codeforces">
      {({ field }) => (
        <FormControl my={4} mr={3}>
          {/*<FormLabel>Your Codeforces profile</FormLabel>*/}
          <InputGroup>
            <InputLeftAddon>{'codeforces.com/profile/'}</InputLeftAddon>
            <Input {...field} id="codeforces" placeholder="your codeforces handle" />
          </InputGroup>
        </FormControl>
      )}
    </Field>
  );
}
