import { Box, Flex, FormLabel } from '@chakra-ui/react';
import YearsField from '@src/components/onboarding/basicInfoForm/basicInfoFormFields/yOEField/yearsField';
import MonthsField from '@src/components/onboarding/basicInfoForm/basicInfoFormFields/yOEField/monthsField';

export default function YOEField() {
  return (
    <Box>
      <FormLabel>Total Experience (Don&apos;t include internships)</FormLabel>
      <Flex direction={['column', 'row']} justify="flex-start">
        <Box pr={[0, 8]}>
          <YearsField />
        </Box>
        <Box>
          <MonthsField />
        </Box>
      </Flex>
    </Box>
  );
}
