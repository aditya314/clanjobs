import { Box, Flex, FormLabel } from '@chakra-ui/react';
import CodeforcesField from '@components/onboarding/profileInfoForm/profileInfoFormFields/codingProfilesField/codeforcesField';
import GithubField from '@components/onboarding/profileInfoForm/profileInfoFormFields/codingProfilesField/githubField';
import CodechefField from '@components/onboarding/profileInfoForm/profileInfoFormFields/codingProfilesField/codechefField';
import { isNil } from 'lodash';

export const buildCodingProfilesInfoRequestFromFromValue = values => {
  let codingProfilesRequest = [];
  if (!isNil(values.codeforces)) {
    codingProfilesRequest.push({
      platformName: 'codeforces',
      username: values.codeforces,
      url: 'https://codeforces.com/profile/' + values.codeforces,
    });
  }
  if (!isNil(values.github)) {
    codingProfilesRequest.push({
      platformName: 'github',
      username: values.github,
      url: 'https://www.github.com/' + values.github,
    });
  }
  if (!isNil(values.codechef)) {
    codingProfilesRequest.push({
      platformName: 'codechef',
      username: values.codechef,
      url: 'https://www.codechef.com/users/' + values.codechef,
    });
  }

  return codingProfilesRequest.length !== 0 ? codingProfilesRequest : null;
};

export default function CodingProfileField() {
  return (
    <Box>
      <FormLabel>Add your coding profiles</FormLabel>
      <Flex direction={['column', 'row']} justify="flex-start">
        <CodeforcesField />
        <GithubField />
        <CodechefField />
      </Flex>
    </Box>
  );
}
