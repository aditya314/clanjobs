import { Field } from 'formik';
import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';

export default function GithubField() {
  return (
    <Field name="github">
      {({ field }) => (
        <FormControl my={4} mr={3}>
          {/*<FormLabel>Your Github profile</FormLabel>*/}
          <InputGroup>
            <InputLeftAddon>{'github.com/'}</InputLeftAddon>
            <Input {...field} id="github" placeholder="your github handle" />
          </InputGroup>
        </FormControl>
      )}
    </Field>
  );
}
