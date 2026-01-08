import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import DegreeField from '@src/components/onboarding/clanInfoForm/clanInfoFromFields/educationListGenerator/educationField/degreeField';
import SpecialisationField from '@src/components/onboarding/clanInfoForm/clanInfoFromFields/educationListGenerator/educationField/specialisationField';
import GradYearField from '@src/components/onboarding/clanInfoForm/clanInfoFromFields/educationListGenerator/educationField/gradYearField';
import CollegeField from '@src/components/onboarding/clanInfoForm/clanInfoFromFields/educationListGenerator/educationField/collegeField';

export default function EducationField({ identifier, index, onRemoveClick }) {
  return (
    <Flex direction="column" borderY="1px" borderColor="gray.200" py={2}>
      <Flex direction="row" alignItems={'center'}>
        <Text fontWeight={'medium'}>College/University #{index + 1} you studied in</Text>
        {index ? (
          <IconButton
            aria-label="Remove college"
            icon={<DeleteIcon />}
            onClick={() => onRemoveClick(index)}
            ml={2}
            color={'red.600'}
            size={'md'}
          />
        ) : (
          <></>
        )}
      </Flex>
      <Flex direction={['column', 'row']}>
        <DegreeField identifier={identifier} />
        <SpecialisationField identifier={identifier} />
        <GradYearField identifier={identifier} />
      </Flex>
      <CollegeField identifier={identifier} />
    </Flex>
  );
}
