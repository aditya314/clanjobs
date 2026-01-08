import { Field } from 'formik';
import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';

export default function InvitedByUsernameField() {
  return (
    <Field name="invitedByUsername">
      {({ field, form }) => (
        <FormControl my={2}>
          <FormLabel>Username of the person who told you about Clanjobs</FormLabel>
          <Input {...field} id="invitedByUsername" placeholder="clanjobs-username" />
          <FormHelperText>
            Both of you will earn 50 gems if the entered username is an active user
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}
