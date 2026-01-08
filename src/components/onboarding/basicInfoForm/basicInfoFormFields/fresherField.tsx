import { Field } from 'formik';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';

export default function FresherFiled() {
  return (
    <Field name="isFresher">
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors.isFresher && form.touched.isFresher}
          my={8}
          display="flex"
          alignItems="center"
        >
          <FormLabel fontSize={'lg'}>I am a fresher</FormLabel>
          <Switch {...field} id="isFresher" size={'lg'} />
        </FormControl>
      )}
    </Field>
  );
}
