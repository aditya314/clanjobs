import { Field } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { apolloGQLClient } from '@pages/_app';
import { gql } from '@apollo/client';

export const IS_USERNAME_AVAILABLE = gql`
  mutation isUsernameAvailable($username: String!) {
    isUsernameAvailable(input: $username)
  }
`;

async function isUserNameOccupied(username: string) {
  try {
    const mutationResponse = await apolloGQLClient.mutate({
      mutation: IS_USERNAME_AVAILABLE,
      variables: {
        username: username,
      },
    });
    return !mutationResponse.data.isUsernameAvailable;
  } catch (e) {
    console.log('Failed to fetch Mutation ', JSON.stringify(e));
    return true;
  }
}

async function validateUserName(value) {
  // https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
  let error;
  if (!value || value.length == 0) {
    error = 'Username is should not be empty';
  } else if (!/^[a-zA-Z0-9\-]+$/.test(value)) {
    error = 'Username can only have alphanumeric characters and dashes';
  } else if (await isUserNameOccupied(value)) {
    error = 'The username ' + value + ' is reserved by someone else. Try something else 🙃';
  }
  return error;
}

export default function UsernameField() {
  return (
    <Field name="username" validate={validateUserName}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors.username && form.touched.username} isRequired my={4}>
          <FormLabel>Choose a unique username</FormLabel>
          <InputGroup>
            <InputLeftAddon>{'clanjobs.com/profile/'}</InputLeftAddon>
            <Input {...field} id="username" placeholder="professional-username" />
          </InputGroup>
          {form.errors.username && form.touched.username ? (
            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
          ) : (
            form.touched.username && (
              <FormHelperText color={'green'}>
                The username {form.values.username} is available to claim ✅
              </FormHelperText>
            )
          )}
        </FormControl>
      )}
    </Field>
  );
}
