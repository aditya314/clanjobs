import { FieldArray } from 'formik';
import { useToast, Button, Flex } from '@chakra-ui/react';
import EducationField from '@src/components/onboarding/clanInfoForm/clanInfoFromFields/educationListGenerator/educationField';

export default function EducationListGenerator() {
  const toast = useToast();
  return (
    <FieldArray name="educationList">
      {({ form, ...fieldArrayHelpers }) => {
        const onAddClick = () => {
          let expectedEducationListLength = form.values.educationList.length + 1;
          if (expectedEducationListLength > 2) {
            toast({
              title: 'Cannot add more than 2 colleges',
              description: 'Creating more than 2 college require premium access',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return;
          }
          fieldArrayHelpers.push({
            id: expectedEducationListLength - 1,
            educationInfo: {
              degree: undefined,
              specialisation: undefined,
              gradYear: undefined,
              collegeName: undefined,
            },
          });
        };
        const onRemoveClick = index => {
          fieldArrayHelpers.remove(index);
        };
        return (
          <Flex direction="column">
            {/*<>{console.log('Props is ', props, 'from', form)}</>*/}
            <Flex direction="column" mb={6}>
              {form.values.educationList.map(({ id }, index) => (
                <EducationField
                  key={id}
                  index={index}
                  identifier={id}
                  onRemoveClick={onRemoveClick}
                />
              ))}
            </Flex>
            <Flex>
              <Button onClick={onAddClick} width={['100%', '30%']}>
                Add more colleges/universities
              </Button>
            </Flex>
          </Flex>
        );
      }}
    </FieldArray>
  );
}
