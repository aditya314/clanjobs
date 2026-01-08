import { Flex, Text } from '@chakra-ui/react';
import { keys, map } from 'lodash';
import React from 'react';
import { EducationInfo } from '@src/graphql/types';

export default function EducationDetails({ education }: { education: Array<EducationInfo> }) {
  return (
    <Flex direction="column" p={2}>
      <Text color="gray.500">Education</Text>
      {map(education, (college: EducationInfo) => (
        <Flex key={college.id} direction="column" my={2} width={['100%', '70%']}>
          <Flex justify={'space-between'}>
            <Text fontWeight={'bold'}>{college.name}</Text>
            <Text>{college.yearOfGraduation}</Text>
          </Flex>
          <Text fontWeight={'semibold'} color="gray.500">
            {college.degree}, {college.specialization}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}
