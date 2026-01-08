import { Field } from 'formik';
import { FormControl, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';

export default function CodechefField() {
  return (
    <Field name="codechef">
      {({ field }) => (
        <FormControl my={4}>
          {/*<FormLabel>Your Codeforces profile</FormLabel>*/}
          <InputGroup>
            <InputLeftAddon>{'codechef.com/users/'}</InputLeftAddon>
            <Input {...field} id="codechef" placeholder="your codechef handle" />
          </InputGroup>
        </FormControl>
      )}
    </Field>
  );
}
