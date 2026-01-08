import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { apolloGQLClient } from '@pages/_app';
import { gql } from '@apollo/client';
import { SkillAutocomplete } from '@src/graphql/types';
import { map } from 'lodash';
import { AsyncSelect } from '@components/common/ChakraSelect';
import SelectSkillItemLabel from '@components/onboarding/autoCompleteItemLabels/selectSkillItemLabel';

export const GET_SKILLS_AUTOCOMPLETE = gql`
  mutation getSkillsAutocomplete($prefix: String!) {
    getSkillsAutocomplete(prefix: $prefix) {
      skills {
        id
        name
        logoUrl
      }
    }
  }
`;

function getOptionsWithLogosFromSkillList(skillList: Array<SkillAutocomplete>) {
  return map(skillList, skill => ({
    value: skill.id,
    label: <SelectSkillItemLabel logo={skill.logoUrl} name={skill.name} />,
  }));
}

export async function getSkillsOptions(text) {
  try {
    const mutationResponse = await apolloGQLClient.mutate({
      mutation: GET_SKILLS_AUTOCOMPLETE,
      variables: {
        prefix: text,
      },
    });
    return getOptionsWithLogosFromSkillList(mutationResponse.data.getSkillsAutocomplete.skills);
  } catch (e) {
    console.log('Failed to fetch Mutation ', e);
  }
}

function validateCoreSkills(value) {
  let error;
  if (!value || value?.length == 0) {
    error = 'Select some core skills';
  } else if (value?.length > 5) {
    error = 'Try to select at most 5 skills. Master of all is master of none!';
  }
  return error;
}

export default function CoreSkillsField() {
  return (
    <Field name="coreSkills" validate={validateCoreSkills}>
      {({ field, form }) => (
        <FormControl
          id={'coreSkills'}
          isRequired
          isInvalid={
            (form.errors.coreSkills && form.touched.coreSkills) ||
            (form.errors.coreSkills && form.submitCount)
          }
          my={4}
        >
          <FormLabel>Select upto 5 skills you are proficient in </FormLabel>
          <AsyncSelect
            isMulti
            name="coreSkills"
            loadOptions={getSkillsOptions}
            placeholder="Type ahead to get skill options..."
            closeMenuOnSelect={true}
            {...field}
            onChange={option => {
              form.setFieldValue(field.name, option);
            }}
            props={field}
          />
          {/*<>{console.log('Field', field, 'Form', form)}</>*/}
          <FormErrorMessage>{form.errors.coreSkills}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
