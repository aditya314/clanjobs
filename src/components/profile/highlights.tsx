import { Badge, Flex } from '@chakra-ui/react';
import ResumeActionsContainer from '@components/common/resumeActionsContainer';
import React from 'react';
import { YearsOfExperience } from '@src/graphql/types';

export default function Highlights({
  name,
  role,
  yoe,
  resumeUrl,
  isFresher,
}: {
  name: string;
  role: string;
  yoe: YearsOfExperience;
  resumeUrl: string;
  isFresher: boolean;
}) {
  return (
    <Flex justify="space-between" width={['100%', '75%']} alignItems="center">
      <Flex direction={'row'}>
        <Badge variant="outline" p={2} mt={4} colorScheme="orange">
          {role}
        </Badge>

        <Badge variant="outline" p={2} mt={4} ml={2} colorScheme="green">
          {!isFresher ? `${yoe.years} years ${yoe.months} months` : 'FRESHER'}
        </Badge>
      </Flex>
      <ResumeActionsContainer name={name} resumeUrl={resumeUrl} />
    </Flex>
  );
}
